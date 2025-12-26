import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { getSession } from '@/lib/auth/session';
import { craftConfigSchema } from '@/lib/validations';
import { logAudit } from '@/lib/audit';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.type !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 401 });
    }

    const { data: configs, error } = await supabaseAdmin
      .from('craft_packet_config')
      .select(`
        *,
        stores:store_id (id, name)
      `)
      .order('store_id');

    if (error) {
      console.error('Error fetching craft config:', error);
      return NextResponse.json(
        { error: 'Failed to fetch configuration' },
        { status: 500 }
      );
    }

    return NextResponse.json({ configs });
  } catch (error) {
    console.error('Craft config GET error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.type !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 401 });
    }

    const body = await request.json();
    const validation = craftConfigSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { store_id, period_type, craft_doc_id } = validation.data;

    const { data: existing } = await supabaseAdmin
      .from('craft_packet_config')
      .select('craft_doc_id')
      .eq('store_id', store_id)
      .eq('period_type', period_type)
      .maybeSingle();

    const oldDocId = existing?.craft_doc_id;

    const { error: upsertError } = await supabaseAdmin
      .from('craft_packet_config')
      .upsert({
        store_id,
        period_type,
        craft_doc_id,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'store_id,period_type',
      });

    if (upsertError) {
      console.error('Error updating craft config:', upsertError);
      return NextResponse.json(
        { error: 'Failed to update configuration' },
        { status: 500 }
      );
    }

    await logAudit({
      actor_type: 'admin',
      actor_label: session.email || 'admin',
      action: 'craft_config_updated',
      metadata: {
        store_id,
        period_type,
        old_doc_id: oldDocId,
        new_doc_id: craft_doc_id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Craft config POST error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
