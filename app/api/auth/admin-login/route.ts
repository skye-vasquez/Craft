import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/auth/session';
import { checkRateLimit, RATE_LIMITS } from '@/lib/auth/rate-limit';
import { adminLoginSchema } from '@/lib/validations';
import { logAudit } from '@/lib/audit';

export const dynamic = 'force-dynamic';

const COOKIE_NAME = 'compliance-session';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = adminLoginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    const rateLimitKey = `admin-login:${email}`;
    const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMITS.adminLogin);

    if (!rateLimit.success) {
      logAudit({
        actor_type: 'admin',
        actor_label: email,
        action: 'admin_login_rate_limited',
        metadata: {},
      });

      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const allowedEmails = (process.env.ADMIN_EMAIL_ALLOWLIST || '')
      .split(',')
      .map((e) => e.trim().toLowerCase());

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!allowedEmails.includes(email.toLowerCase())) {
      logAudit({
        actor_type: 'admin',
        actor_label: email,
        action: 'admin_login_failed',
        metadata: { reason: 'email_not_allowed' },
      });

      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (password !== adminPassword) {
      logAudit({
        actor_type: 'admin',
        actor_label: email,
        action: 'admin_login_failed',
        metadata: { reason: 'invalid_password' },
      });

      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = await createSession({
      type: 'admin',
      email,
    });

    logAudit({
      actor_type: 'admin',
      actor_label: email,
      action: 'admin_login_success',
      metadata: {},
    });

    const response = NextResponse.json({
      success: true,
      admin: { email },
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
