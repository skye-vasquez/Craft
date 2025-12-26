import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { getSession } from '@/lib/auth/session';
import { checkRateLimit, RATE_LIMITS } from '@/lib/auth/rate-limit';
import { submissionSchema } from '@/lib/validations';
import { calculatePeriodKey } from '@/lib/utils/period';
import { logAudit } from '@/lib/audit';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const storeId = searchParams.get('store_id');
    const controlId = searchParams.get('control_id');
    const periodKey = searchParams.get('period_key');
    const status = searchParams.get('status');
    const syncStatus = searchParams.get('craft_sync_status');

    let query = supabaseAdmin
      .from('submissions')
      .select(`
        *,
        stores:store_id (id, name),
        controls:control_id (id, name, period_type)
      `)
      .order('created_at', { ascending: false });

    if (session.type === 'store') {
      query = query.eq('store_id', session.storeId);
    } else if (storeId) {
      query = query.eq('store_id', storeId);
    }

    if (controlId) query = query.eq('control_id', controlId);
    if (periodKey) query = query.eq('period_key', periodKey);
    if (status) query = query.eq('status', status);
    if (syncStatus) query = query.eq('craft_sync_status', syncStatus);

    const { data: submissions, error } = await query;

    if (error) {
      console.error('Error fetching submissions:', error);
      return NextResponse.json(
        { error: 'Failed to fetch submissions' },
        { status: 500 }
      );
    }

    return NextResponse.json({ submissions });
  } catch (error) {
    console.error('Submissions GET error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.type !== 'store') {
      return NextResponse.json({ error: 'Store authentication required' }, { status: 401 });
    }

    const rateLimitKey = `submission:${session.storeId}`;
    const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMITS.submission);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many submissions. Please wait a moment.' },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    const bodyData = {
      control_id: formData.get('control_id') as string,
      submission_date: formData.get('submission_date') as string,
      submitter_name: formData.get('submitter_name') as string,
      submitter_email: formData.get('submitter_email') as string || '',
      notes: formData.get('notes') as string || '',
    };

    const validation = submissionSchema.safeParse(bodyData);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { control_id, submission_date, submitter_name, submitter_email, notes } = validation.data;

    if (!notes && !file) {
      return NextResponse.json(
        { error: 'Please provide notes or upload a file' },
        { status: 400 }
      );
    }

    const { data: control, error: controlError } = await supabaseAdmin
      .from('controls')
      .select('period_type')
      .eq('id', control_id)
      .maybeSingle();

    if (controlError || !control) {
      return NextResponse.json(
        { error: 'Invalid control selected' },
        { status: 400 }
      );
    }

    const period_type = control.period_type as 'weekly' | 'monthly';
    const period_key = calculatePeriodKey(new Date(submission_date), period_type);

    let file_url: string | null = null;

    if (file && file.size > 0) {
      const fileExt = file.name.split('.').pop() || 'bin';
      const fileName = `${session.storeId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

      const { error: uploadError } = await supabaseAdmin.storage
        .from('evidence-files')
        .upload(fileName, file, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error('File upload error:', uploadError);
        return NextResponse.json(
          { error: 'Failed to upload file' },
          { status: 500 }
        );
      }

      const { data: publicUrl } = supabaseAdmin.storage
        .from('evidence-files')
        .getPublicUrl(fileName);

      file_url = publicUrl.publicUrl;
    }

    const { data: submission, error: insertError } = await supabaseAdmin
      .from('submissions')
      .insert({
        store_id: session.storeId,
        control_id,
        period_type,
        period_key,
        submission_date,
        submitter_name,
        submitter_email: submitter_email || null,
        notes,
        file_url,
        status: 'submitted',
        craft_sync_status: 'pending',
      })
      .select()
      .single();

    if (insertError) {
      console.error('Submission insert error:', insertError);
      return NextResponse.json(
        { error: 'Failed to create submission' },
        { status: 500 }
      );
    }

    await logAudit({
      actor_type: 'store_user',
      actor_label: `${session.storeName} - ${submitter_name}`,
      action: 'submission_created',
      metadata: {
        submission_id: submission.id,
        control_id,
        period_key,
        store_id: session.storeId,
      },
    });

    return NextResponse.json({
      success: true,
      submission: {
        id: submission.id,
        control_id: submission.control_id,
        period_key: submission.period_key,
        craft_sync_status: submission.craft_sync_status,
      },
    });
  } catch (error) {
    console.error('Submission POST error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
