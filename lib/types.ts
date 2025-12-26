export interface Store {
  id: string;
  name: string;
}

export interface Control {
  id: string;
  name: string;
  period_type: 'weekly' | 'monthly';
  is_active: boolean;
  display_order: number;
}

export interface CraftPacketConfig {
  id: string;
  store_id: string;
  period_type: 'weekly' | 'monthly';
  craft_doc_id: string;
  updated_at: string;
}

export type SubmissionStatus = 'submitted' | 'reviewed';
export type CraftSyncStatus = 'pending' | 'success' | 'failed';

export interface Submission {
  id: string;
  store_id: string;
  control_id: string;
  period_type: 'weekly' | 'monthly';
  period_key: string;
  submission_date: string;
  submitter_name: string;
  submitter_email: string | null;
  notes: string;
  file_url: string | null;
  status: SubmissionStatus;
  reviewed_by: string | null;
  reviewed_at: string | null;
  craft_sync_status: CraftSyncStatus;
  craft_sync_error: string | null;
  craft_synced_at: string | null;
  created_at: string;
  stores?: Store;
  controls?: Control;
}

export interface AuditLog {
  id: string;
  actor_type: 'admin' | 'store_user' | 'system';
  actor_label: string;
  action: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface SessionPayload {
  type: 'store' | 'admin';
  storeId?: string;
  storeName?: string;
  email?: string;
  exp: number;
}

export interface SubmissionFormData {
  control_id: string;
  submission_date: string;
  submitter_name: string;
  submitter_email?: string;
  notes: string;
  file?: File;
}
