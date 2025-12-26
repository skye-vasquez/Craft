import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { logAudit } from '@/lib/audit';

export const dynamic = 'force-dynamic';

const COOKIE_NAME = 'compliance-session';

export async function POST() {
  try {
    const session = await getSession();

    if (session) {
      logAudit({
        actor_type: session.type === 'admin' ? 'admin' : 'store_user',
        actor_label: session.email || session.storeName || 'unknown',
        action: 'logout',
        metadata: { session_type: session.type },
      });
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set(COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
