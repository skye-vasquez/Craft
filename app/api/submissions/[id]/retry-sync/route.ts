import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { retryCraftSync } from '@/lib/craft/client';
import { logAudit } from '@/lib/audit';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.type !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 401 });
    }

    const { id } = await params;

    const result = await retryCraftSync(id);

    await logAudit({
      actor_type: 'admin',
      actor_label: session.email || 'admin',
      action: 'craft_sync_retry',
      metadata: {
        submission_id: id,
        success: result.success,
        error: result.error,
      },
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Sync failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Retry sync error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
