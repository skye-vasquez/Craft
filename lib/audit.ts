import { supabaseAdmin } from '@/lib/supabase/server';

export type ActorType = 'admin' | 'store_user' | 'system';

export interface AuditLogEntry {
  actor_type: ActorType;
  actor_label: string;
  action: string;
  metadata?: Record<string, unknown>;
}

export async function logAudit(entry: AuditLogEntry): Promise<void> {
  try {
    await supabaseAdmin.from('audit_log').insert({
      actor_type: entry.actor_type,
      actor_label: entry.actor_label,
      action: entry.action,
      metadata: entry.metadata || {},
    });
  } catch (error) {
    console.error('Failed to log audit event:', error);
  }
}
