import { supabaseAdmin } from '@/lib/supabase/server';
import type { Submission } from '@/lib/types';
import { formatDateTime } from '@/lib/utils/period';

interface CraftSyncResult {
  success: boolean;
  error?: string;
}

interface CraftBlock {
  id: string;
  type: string;
  textStyle?: string;
  markdown?: string;
  content?: CraftBlock[];
}

const CRAFT_API_BASE_URL = process.env.CRAFT_API_BASE_URL || 'https://connect.craft.do/links/A4GjzXIMAtk/api/v1';

function formatSubmissionContent(submission: Submission): string {
  const timestamp = formatDateTime(submission.created_at);
  const submitter = submission.submitter_email
    ? `${submission.submitter_name} (${submission.submitter_email})`
    : submission.submitter_name;

  let content = `- ${timestamp} | ${submission.period_key} | ${submitter} | ID: ${submission.id.slice(0, 8)}`;

  if (submission.notes) {
    content += `\n  - Notes: ${submission.notes}`;
  }

  if (submission.file_url) {
    content += `\n  - File: [View Evidence](${submission.file_url})`;
  }

  return content;
}

async function fetchDocumentBlocks(docId: string): Promise<CraftBlock | null> {
  try {
    const response = await fetch(`${CRAFT_API_BASE_URL}/blocks?id=${docId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch document blocks:', response.status, await response.text());
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching document:', error);
    return null;
  }
}

function findBlockByHeading(block: CraftBlock, heading: string): CraftBlock | null {
  if (block.markdown?.includes(heading)) {
    return block;
  }

  if (block.content) {
    for (const child of block.content) {
      const found = findBlockByHeading(child, heading);
      if (found) return found;
    }
  }

  return null;
}

async function searchInDocument(docId: string, pattern: string): Promise<string | null> {
  try {
    const response = await fetch(
      `${CRAFT_API_BASE_URL}/blocks/search?blockId=${docId}&pattern=${encodeURIComponent(pattern)}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Search failed:', response.status);
      return null;
    }

    const data = await response.json();
    if (data.items && data.items.length > 0) {
      return data.items[0].blockId;
    }

    return null;
  } catch (error) {
    console.error('Error searching document:', error);
    return null;
  }
}

async function insertBlock(
  pageId: string,
  markdown: string,
  position: 'start' | 'end' = 'end'
): Promise<{ success: boolean; blockId?: string }> {
  try {
    const response = await fetch(`${CRAFT_API_BASE_URL}/blocks`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        blocks: [
          {
            type: 'text',
            markdown: markdown,
          },
        ],
        position: {
          position: position,
          pageId: pageId,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to insert block:', response.status, errorText);
      return { success: false };
    }

    const data = await response.json();
    const blockId = data.items?.[0]?.id;
    return { success: true, blockId };
  } catch (error) {
    console.error('Error inserting block:', error);
    return { success: false };
  }
}

async function syncWithCraftAPI(
  docId: string,
  controlId: string,
  content: string
): Promise<CraftSyncResult> {
  try {
    const doc = await fetchDocumentBlocks(docId);
    if (!doc) {
      return { success: false, error: 'Failed to fetch document from Craft' };
    }

    const controlSectionId = await searchInDocument(docId, `### ${controlId}`);

    if (controlSectionId) {
      const insertResult = await insertBlock(controlSectionId, content, 'end');
      if (!insertResult.success) {
        return { success: false, error: `Failed to insert content under ${controlId}` };
      }
      return { success: true };
    }

    const portalSectionId = await searchInDocument(docId, '## Portal submissions');

    if (portalSectionId) {
      const headerResult = await insertBlock(portalSectionId, `### ${controlId}`, 'end');
      if (!headerResult.success) {
        return { success: false, error: `Failed to create ${controlId} section` };
      }

      if (headerResult.blockId) {
        const insertResult = await insertBlock(headerResult.blockId, content, 'end');
        if (!insertResult.success) {
          return { success: false, error: `Failed to insert content under new ${controlId} section` };
        }
      }
      return { success: true };
    }

    const createPortalResult = await insertBlock(docId, '## Portal submissions', 'end');
    if (!createPortalResult.success) {
      return { success: false, error: 'Failed to create Portal submissions section' };
    }

    if (createPortalResult.blockId) {
      const headerResult = await insertBlock(createPortalResult.blockId, `### ${controlId}`, 'end');
      if (headerResult.success && headerResult.blockId) {
        await insertBlock(headerResult.blockId, content, 'end');
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Craft sync error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

async function simulateCraftSync(): Promise<CraftSyncResult> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { success: true };
}

export async function syncSubmissionToCraft(
  submission: Submission
): Promise<CraftSyncResult> {
  const { data: craftConfig } = await supabaseAdmin
    .from('craft_packet_config')
    .select('craft_doc_id')
    .eq('store_id', submission.store_id)
    .eq('period_type', submission.period_type)
    .maybeSingle();

  if (!craftConfig) {
    const result = {
      success: false,
      error: 'No Craft document configured for this store/period',
    };

    await supabaseAdmin
      .from('submissions')
      .update({
        craft_sync_status: 'failed',
        craft_sync_error: result.error,
      })
      .eq('id', submission.id);

    return result;
  }

  const content = formatSubmissionContent(submission);

  const isCraftConfigured = !!process.env.CRAFT_API_BASE_URL;

  let result: CraftSyncResult;

  if (isCraftConfigured) {
    result = await syncWithCraftAPI(
      craftConfig.craft_doc_id,
      submission.control_id,
      content
    );
  } else {
    console.log('Craft API not configured, simulating successful sync');
    result = await simulateCraftSync();
  }

  await supabaseAdmin
    .from('submissions')
    .update({
      craft_sync_status: result.success ? 'success' : 'failed',
      craft_sync_error: result.error || null,
      craft_synced_at: result.success ? new Date().toISOString() : null,
    })
    .eq('id', submission.id);

  return result;
}

export async function retryCraftSync(submissionId: string): Promise<CraftSyncResult> {
  const { data: submission, error } = await supabaseAdmin
    .from('submissions')
    .select(`
      *,
      stores:store_id (id, name),
      controls:control_id (id, name, period_type)
    `)
    .eq('id', submissionId)
    .maybeSingle();

  if (error || !submission) {
    return { success: false, error: 'Submission not found' };
  }

  return syncSubmissionToCraft(submission as Submission);
}
