import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { getSession } from '@/lib/auth/session';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    let query = supabaseAdmin
      .from('submissions')
      .select(`
        *,
        stores:store_id (id, name),
        controls:control_id (id, name, period_type)
      `)
      .eq('id', id);

    if (session.type === 'store') {
      query = query.eq('store_id', session.storeId);
    }

    const { data: submission, error } = await query.maybeSingle();

    if (error) {
      console.error('Error fetching submission:', error);
      return NextResponse.json(
        { error: 'Failed to fetch submission' },
        { status: 500 }
      );
    }

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    let auditLogs = [];
    if (session.type === 'admin') {
      const { data: logs } = await supabaseAdmin
        .from('audit_log')
        .select('*')
        .or(`metadata->submission_id.eq.${id},metadata->>submission_id.eq.${id}`)
        .order('created_at', { ascending: false });
      auditLogs = logs || [];
    }

    return NextResponse.json({ submission, auditLogs });
  } catch (error) {
    console.error('Submission GET error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
