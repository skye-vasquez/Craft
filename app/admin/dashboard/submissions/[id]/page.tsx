'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  ExternalLink,
  FileText,
  Clock,
  AlertCircle,
  Save,
} from 'lucide-react';
import { Button, Badge, Card, Input } from '@/components/ui';
import { formatDateTime, formatPeriodKey } from '@/lib/utils/period';
import type { Submission, AuditLog } from '@/lib/types';

export default function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [periodKey, setPeriodKey] = useState('');
  const [savingPeriod, setSavingPeriod] = useState(false);

  useEffect(() => {
    async function fetchSubmission() {
      try {
        const res = await fetch(`/api/submissions/${id}`);
        const data = await res.json();

        if (data.submission) {
          setSubmission(data.submission);
          setPeriodKey(data.submission.period_key);
        }
        if (data.auditLogs) {
          setAuditLogs(data.auditLogs);
        }
      } catch (err) {
        console.error('Failed to fetch submission:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchSubmission();
  }, [id]);

  const handleRetrySync = async () => {
    setSyncing(true);
    try {
      const res = await fetch(`/api/submissions/${id}/retry-sync`, {
        method: 'POST',
      });
      if (res.ok) {
        const updatedRes = await fetch(`/api/submissions/${id}`);
        const data = await updatedRes.json();
        if (data.submission) {
          setSubmission(data.submission);
        }
        if (data.auditLogs) {
          setAuditLogs(data.auditLogs);
        }
      }
    } catch (err) {
      console.error('Retry sync failed:', err);
    } finally {
      setSyncing(false);
    }
  };

  const handleReview = async () => {
    setReviewing(true);
    try {
      const res = await fetch(`/api/submissions/${id}/review`, {
        method: 'PATCH',
      });
      if (res.ok) {
        const updatedRes = await fetch(`/api/submissions/${id}`);
        const data = await updatedRes.json();
        if (data.submission) {
          setSubmission(data.submission);
        }
        if (data.auditLogs) {
          setAuditLogs(data.auditLogs);
        }
      }
    } catch (err) {
      console.error('Review failed:', err);
    } finally {
      setReviewing(false);
    }
  };

  const handleSavePeriodKey = async () => {
    setSavingPeriod(true);
    try {
      const res = await fetch(`/api/submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ period_key: periodKey }),
      });
      if (res.ok) {
        const updatedRes = await fetch(`/api/submissions/${id}`);
        const data = await updatedRes.json();
        if (data.submission) {
          setSubmission(data.submission);
        }
      }
    } catch (err) {
      console.error('Save period key failed:', err);
    } finally {
      setSavingPeriod(false);
    }
  };

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto p-4 py-8">
        <Card>
          <p className="font-heading font-bold text-xl text-center">Loading...</p>
        </Card>
      </main>
    );
  }

  if (!submission) {
    return (
      <main className="max-w-4xl mx-auto p-4 py-8">
        <Card className="text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">Submission Not Found</h2>
          <Link href="/admin/dashboard">
            <Button variant="secondary">Back to Dashboard</Button>
          </Link>
        </Card>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-4 py-8">
      <Link
        href="/admin/dashboard"
        className="inline-flex items-center gap-2 font-heading font-bold mb-6 hover:underline"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </Link>

      <Card className="mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-heading text-2xl font-bold mb-2">
              {submission.control_id}: {submission.controls?.name}
            </h1>
            <p className="text-nb-gray-dark">
              {submission.stores?.name} - {formatPeriodKey(submission.period_key)}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant={submission.status === 'reviewed' ? 'reviewed' : 'submitted'}>
              {submission.status}
            </Badge>
            <Badge
              variant={
                submission.craft_sync_status === 'success'
                  ? 'success'
                  : submission.craft_sync_status === 'failed'
                  ? 'failed'
                  : 'pending'
              }
            >
              {submission.craft_sync_status}
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="font-bold text-sm text-nb-gray-dark">Submitter</p>
              <p className="font-heading font-bold">{submission.submitter_name}</p>
              {submission.submitter_email && (
                <p className="text-sm text-nb-gray-dark">{submission.submitter_email}</p>
              )}
            </div>

            <div>
              <p className="font-bold text-sm text-nb-gray-dark">Submission Date</p>
              <p>{formatDateTime(submission.created_at)}</p>
            </div>

            <div>
              <p className="font-bold text-sm text-nb-gray-dark">Evidence Date</p>
              <p>{submission.submission_date}</p>
            </div>

            <div>
              <p className="font-bold text-sm text-nb-gray-dark">Submission ID</p>
              <p className="font-mono text-sm">{submission.id}</p>
            </div>
          </div>

          <div className="space-y-4">
            {submission.notes && (
              <div>
                <p className="font-bold text-sm text-nb-gray-dark mb-1">Notes</p>
                <div className="bg-nb-gray border-3 border-nb-black p-3 text-sm whitespace-pre-wrap">
                  {submission.notes}
                </div>
              </div>
            )}

            {submission.file_url && (
              <div>
                <p className="font-bold text-sm text-nb-gray-dark mb-1">File</p>
                <a
                  href={submission.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-bold text-nb-blue hover:underline"
                >
                  <FileText className="w-4 h-4" />
                  View Attached File
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

            {submission.status === 'reviewed' && (
              <div className="bg-nb-green border-3 border-nb-black p-3">
                <p className="font-bold">Reviewed</p>
                <p className="text-sm">
                  By {submission.reviewed_by} on{' '}
                  {submission.reviewed_at
                    ? formatDateTime(submission.reviewed_at)
                    : 'N/A'}
                </p>
              </div>
            )}

            {submission.craft_sync_status === 'failed' && submission.craft_sync_error && (
              <div className="bg-nb-red text-white border-3 border-nb-black p-3">
                <p className="font-bold">Sync Error</p>
                <p className="text-sm">{submission.craft_sync_error}</p>
              </div>
            )}
          </div>
        </div>

        <div className="border-t-3 border-nb-black mt-6 pt-6">
          <p className="font-bold text-sm text-nb-gray-dark mb-2">Override Period Key</p>
          <div className="flex gap-2">
            <Input
              value={periodKey}
              onChange={(e) => setPeriodKey(e.target.value)}
              placeholder="YYYY-Www or YYYY-MM"
              className="max-w-xs"
            />
            <Button
              variant="secondary"
              onClick={handleSavePeriodKey}
              loading={savingPeriod}
              disabled={periodKey === submission.period_key}
            >
              <Save className="w-4 h-4" />
              Save
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          {submission.status !== 'reviewed' && (
            <Button variant="success" onClick={handleReview} loading={reviewing}>
              <CheckCircle2 className="w-5 h-5" />
              Mark as Reviewed
            </Button>
          )}

          <Button
            variant="primary"
            onClick={handleRetrySync}
            loading={syncing}
          >
            <RefreshCw className="w-5 h-5" />
            {submission.craft_sync_status === 'failed' ? 'Retry Sync' : 'Re-sync to Craft'}
          </Button>
        </div>
      </Card>

      {auditLogs.length > 0 && (
        <Card>
          <h2 className="font-heading text-xl font-bold mb-4">Audit Log</h2>
          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3 p-3 bg-nb-gray border-2 border-nb-black"
              >
                <div className="p-2 bg-white border-2 border-nb-black">
                  {log.action.includes('review') ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : log.action.includes('sync') ? (
                    <RefreshCw className="w-4 h-4" />
                  ) : log.action.includes('fail') ? (
                    <AlertCircle className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{log.action}</p>
                  <p className="text-xs text-nb-gray-dark">
                    {log.actor_label} - {formatDateTime(log.created_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </main>
  );
}
