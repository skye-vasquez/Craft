import { z } from 'zod';

export const storeLoginSchema = z.object({
  storeName: z.string().min(1, 'Store is required'),
  pin: z.string().length(6, 'PIN must be 6 digits').regex(/^\d+$/, 'PIN must contain only numbers'),
});

export const adminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const submissionSchema = z.object({
  control_id: z.string().min(1, 'Control is required'),
  submission_date: z.string().min(1, 'Date is required'),
  submitter_name: z.string().min(1, 'Your name is required'),
  submitter_email: z.string().email().optional().or(z.literal('')),
  notes: z.string(),
});

export const reviewSubmissionSchema = z.object({
  reviewed_by: z.string().min(1, 'Reviewer is required'),
});

export const updatePeriodKeySchema = z.object({
  period_key: z.string().min(1, 'Period key is required'),
});

export const storePinSchema = z.object({
  store_id: z.string().uuid('Invalid store ID'),
  pin: z.string().length(6, 'PIN must be 6 digits').regex(/^\d+$/, 'PIN must contain only numbers'),
});

export const craftConfigSchema = z.object({
  store_id: z.string().uuid('Invalid store ID'),
  period_type: z.enum(['weekly', 'monthly']),
  craft_doc_id: z.string().min(1, 'Craft document ID is required'),
});

export type StoreLoginInput = z.infer<typeof storeLoginSchema>;
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
export type SubmissionInput = z.infer<typeof submissionSchema>;
export type ReviewSubmissionInput = z.infer<typeof reviewSubmissionSchema>;
export type UpdatePeriodKeyInput = z.infer<typeof updatePeriodKeySchema>;
export type StorePinInput = z.infer<typeof storePinSchema>;
export type CraftConfigInput = z.infer<typeof craftConfigSchema>;
