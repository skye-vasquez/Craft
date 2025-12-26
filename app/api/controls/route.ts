import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function GET() {
  try {
    const { data: controls, error } = await supabaseAdmin
      .from('controls')
      .select('id, name, period_type, is_active, display_order')
      .eq('is_active', true)
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
    console.error('Controls API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
