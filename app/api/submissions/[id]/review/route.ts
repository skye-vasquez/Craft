import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { getSession } from '@/lib/auth/session';
import { logAudit } from '@/lib/audit';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.type !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 401 });
    }

    const { id } = await params;

    const { data: submission, error: fetchError } = await supabaseAdmin
      .from('submissions')
      .select('id, status')
      .eq('id', id)
      .maybeSingle();

    if (fetchError || !submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    const { error: updateError } = await supabaseAdmin
      .from('submissions')
      .update({
        status: 'reviewed',
        reviewed_by: session.email,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (updateError) {
      console.error('Error updating submission:', updateError);
      return NextResponse.json(
        { error: 'Failed to update submission' },
        { status: 500 }
      );
    }

    await logAudit({
      actor_type: 'admin',
      actor_label: session.email || 'admin',
      action: 'submission_reviewed',
      metadata: { submission_id: id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Review submission error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
