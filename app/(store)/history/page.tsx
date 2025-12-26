'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { History, FileText, ExternalLink, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { formatDateTime, formatPeriodKey } from '@/lib/utils/period';
import type { Submission } from '@/lib/types';

export default function HistoryPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const res = await fetch('/api/submissions');
        const data = await res.json();
        if (data.submissions) {
          setSubmissions(data.submissions);
        }
      } catch (err) {
        console.error('Failed to fetch submissions:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSubmissions();
  }, []);

  const getSyncStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-nb-green" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-nb-red" />;
      default:
        return <Clock className="w-5 h-5 text-nb-orange" />;
    }
  };

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto p-4 py-8">
        <Card>
          <p className="font-heading font-bold text-xl text-center">Loading submissions...</p>
        </Card>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-nb-teal border-3 border-nb-black">
          <History className="w-6 h-6" />
        </div>
        <h1 className="font-heading text-3xl font-bold">Submission History</h1>
      </div>

      {submissions.length === 0 ? (
        <Card className="text-center py-12">
          <FileText className="w-16 h-16 mx-auto mb-4 text-nb-gray-dark" />
          <h2 className="font-heading text-xl font-bold mb-2">No Submissions Yet</h2>
          <p className="text-nb-gray-dark mb-6">
            You haven&apos;t submitted any evidence yet.
          </p>
          <Link href="/submit">
            <Button variant="primary">Submit Evidence</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <Card
              key={submission.id}
              hoverable
              onClick={() => setSelectedSubmission(submission)}
              className="cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-heading font-bold text-lg">
                      {submission.control_id}
                    </span>
                    <Badge
                      variant={submission.status === 'reviewed' ? 'reviewed' : 'submitted'}
                    >
                      {submission.status}
                    </Badge>
                  </div>
                  <p className="text-nb-gray-dark text-sm">
                    {submission.controls?.name}
                  </p>
                  <p className="text-sm mt-1">
                    <span className="font-bold">Period:</span>{' '}
                    {formatPeriodKey(submission.period_key)}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getSyncStatusIcon(submission.craft_sync_status)}
                    <span className="text-sm font-bold capitalize">
                      {submission.craft_sync_status === 'success' ? 'Synced' :
                       submission.craft_sync_status === 'failed' ? 'Sync Failed' : 'Pending'}
                    </span>
                  </div>
                  <span className="text-sm text-nb-gray-dark">
                    {formatDateTime(submission.created_at)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {selectedSubmission && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedSubmission(null)}
        >
          <Card
            className="max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-2xl font-bold">
                Submission Details
              </h2>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-2 border-3 border-nb-black hover:bg-nb-gray"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Badge
                  variant={selectedSubmission.status === 'reviewed' ? 'reviewed' : 'submitted'}
                >
                  {selectedSubmission.status}
                </Badge>
                <Badge
                  variant={
                    selectedSubmission.craft_sync_status === 'success'
                      ? 'success'
                      : selectedSubmission.craft_sync_status === 'failed'
                      ? 'failed'
                      : 'pending'
                  }
                >
                  Sync: {selectedSubmission.craft_sync_status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-bold">Control</p>
                  <p>{selectedSubmission.control_id}</p>
                </div>
                <div>
                  <p className="font-bold">Period</p>
                  <p>{formatPeriodKey(selectedSubmission.period_key)}</p>
                </div>
                <div>
                  <p className="font-bold">Submitted By</p>
                  <p>{selectedSubmission.submitter_name}</p>
                </div>
                <div>
                  <p className="font-bold">Date</p>
                  <p>{formatDateTime(selectedSubmission.created_at)}</p>
                </div>
              </div>

              {selectedSubmission.notes && (
                <div>
                  <p className="font-bold mb-1">Notes</p>
                  <div className="bg-nb-gray border-3 border-nb-black p-3 text-sm">
                    {selectedSubmission.notes}
                  </div>
                </div>
              )}

              {selectedSubmission.file_url && (
                <div>
                  <p className="font-bold mb-1">Attached File</p>
                  <a
                    href={selectedSubmission.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-bold text-nb-blue hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View File
                  </a>
                </div>
              )}

              {selectedSubmission.status === 'reviewed' && (
                <div className="bg-nb-green border-3 border-nb-black p-3">
                  <p className="font-bold">Reviewed</p>
                  <p className="text-sm">
                    By {selectedSubmission.reviewed_by} on{' '}
                    {selectedSubmission.reviewed_at
                      ? formatDateTime(selectedSubmission.reviewed_at)
                      : 'N/A'}
                  </p>
                </div>
              )}

              {selectedSubmission.craft_sync_status === 'failed' &&
                selectedSubmission.craft_sync_error && (
                  <div className="bg-nb-red text-white border-3 border-nb-black p-3">
                    <p className="font-bold">Sync Error</p>
                    <p className="text-sm">{selectedSubmission.craft_sync_error}</p>
                  </div>
                )}
            </div>

            <Button
              variant="secondary"
              onClick={() => setSelectedSubmission(null)}
              className="w-full mt-6"
            >
              Close
            </Button>
          </Card>
        </div>
      )}
    </main>
  );
}
