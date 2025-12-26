import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        type: session.type,
        storeId: session.storeId,
        storeName: session.storeName,
        email: session.email,
      },
    });
  } catch (error) {
    console.error('Get session error:', error);
    return NextResponse.json({ user: null });
  }
}
