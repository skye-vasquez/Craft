import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { getSession } from '@/lib/auth/session';
import { logAudit } from '@/lib/audit';
import { z } from 'zod';

const updateControlSchema = z.object({
  id: z.string().min(1),
  is_active: z.boolean().optional(),
  display_order: z.number().optional(),
});

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.type !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 401 });
    }

    const { data: controls, error } = await supabaseAdmin
      .from('controls')
      .select('*')
      .order('display_order');

    if (error) {
      console.error('Error fetching controls:', error);
      return NextResponse.json(
        { error: 'Failed to fetch controls' },
        { status: 500 }
      );
    }

    return NextResponse.json({ controls });
  } catch (error) {
    console.error('Controls GET error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.type !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 401 });
    }

    const body = await request.json();
    const validation = updateControlSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { id, is_active, display_order } = validation.data;

    const updates: Record<string, unknown> = {};
    if (is_active !== undefined) updates.is_active = is_active;
    if (display_order !== undefined) updates.display_order = display_order;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No updates provided' },
        { status: 400 }
      );
    }

    const { error: updateError } = await supabaseAdmin
      .from('controls')
      .update(updates)
      .eq('id', id);

    if (updateError) {
      console.error('Error updating control:', updateError);
      return NextResponse.json(
        { error: 'Failed to update control' },
        { status: 500 }
      );
    }

    await logAudit({
      actor_type: 'admin',
      actor_label: session.email || 'admin',
      action: 'control_updated',
      metadata: { control_id: id, updates },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Control PATCH error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
