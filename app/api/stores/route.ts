import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function GET() {
  try {
    const { data: stores, error } = await supabaseAdmin
      .from('stores')
      .select('id, name')
      .order('name');

    if (error) {
      console.error('Error fetching stores:', error);
      return NextResponse.json(
        { error: 'Failed to fetch stores' },
        { status: 500 }
      );
    }

    return NextResponse.json({ stores });
  } catch (error) {
    console.error('Stores API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
