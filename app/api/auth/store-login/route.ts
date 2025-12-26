import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase/server';
import { createSession } from '@/lib/auth/session';
import { checkRateLimit, RATE_LIMITS } from '@/lib/auth/rate-limit';
import { storeLoginSchema } from '@/lib/validations';
import { logAudit } from '@/lib/audit';

export const dynamic = 'force-dynamic';

const COOKIE_NAME = 'compliance-session';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = storeLoginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { storeName, pin } = validation.data;

    const rateLimitKey = `store-login:${storeName}`;
    const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMITS.storeLogin);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const { data: store, error: storeError } = await supabaseAdmin
      .from('stores')
      .select('id, name')
      .eq('name', storeName)
      .maybeSingle();

    if (storeError || !store) {
      return NextResponse.json(
        { error: 'Invalid store or PIN' },
        { status: 401 }
      );
    }

    const { data: auth, error: authError } = await supabaseAdmin
      .from('store_auth')
      .select('pin_hash')
      .eq('store_id', store.id)
      .maybeSingle();

    if (authError || !auth) {
      return NextResponse.json(
        { error: 'Store authentication not configured' },
        { status: 401 }
      );
    }

    const isValidPin = await bcrypt.compare(pin, auth.pin_hash);

    if (!isValidPin) {
      logAudit({
        actor_type: 'store_user',
        actor_label: storeName,
        action: 'store_login_failed',
        metadata: { store_id: store.id, reason: 'invalid_pin' },
      });

      return NextResponse.json(
        { error: 'Invalid store or PIN' },
        { status: 401 }
      );
    }

    const token = await createSession({
      type: 'store',
      storeId: store.id,
      storeName: store.name,
    });

    logAudit({
      actor_type: 'store_user',
      actor_label: storeName,
      action: 'store_login_success',
      metadata: { store_id: store.id },
    });

    const response = NextResponse.json({
      success: true,
      store: { id: store.id, name: store.name },
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
    console.error('Store login error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
