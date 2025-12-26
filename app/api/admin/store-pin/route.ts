import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase/server';
import { getSession } from '@/lib/auth/session';
import { storePinSchema } from '@/lib/validations';
import { logAudit } from '@/lib/audit';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.type !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 401 });
    }

    const body = await request.json();
    const validation = storePinSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { store_id, pin } = validation.data;

    const { data: store } = await supabaseAdmin
      .from('stores')
      .select('name')
      .eq('id', store_id)
      .maybeSingle();

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    const pin_hash = await bcrypt.hash(pin, 10);

    const { error: upsertError } = await supabaseAdmin
      .from('store_auth')
      .upsert({
        store_id,
        pin_hash,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'store_id',
      });

    if (upsertError) {
      console.error('Error updating PIN:', upsertError);
      return NextResponse.json(
        { error: 'Failed to update PIN' },
        { status: 500 }
      );
    }

    await logAudit({
      actor_type: 'admin',
      actor_label: session.email || 'admin',
      action: 'store_pin_updated',
      metadata: { store_id, store_name: store.name },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Store PIN update error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
