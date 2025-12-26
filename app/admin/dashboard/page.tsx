'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Filter,
  ExternalLink,
  Eye,
} from 'lucide-react';
import { Button, Select, Badge, Card } from '@/components/ui';
import { formatDateTime, formatPeriodKey } from '@/lib/utils/period';
import type { Submission, Store, Control } from '@/lib/types';

export default function AdminDashboardPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [controls, setControls] = useState<Control[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState<string | null>(null);
  const [reviewing, setReviewing] = useState<string | null>(null);

  const [filterStore, setFilterStore] = useState('');
  const [filterControl, setFilterControl] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSyncStatus, setFilterSyncStatus] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [subRes, storeRes, controlRes] = await Promise.all([
        fetch('/api/submissions'),
        fetch('/api/stores'),
        fetch('/api/controls'),
      ]);

      const [subData, storeData, controlData] = await Promise.all([
        subRes.json(),
        storeRes.json(),
        controlRes.json(),
      ]);

      if (subData.submissions) setSubmissions(subData.submissions);
      if (storeData.stores) setStores(storeData.stores);
      if (controlData.controls) setControls(controlData.controls);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRetrySync = async (id: string) => {
    setSyncing(id);
    try {
      const res = await fetch(`/api/submissions/${id}/retry-sync`, {
        method: 'POST',
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error('Retry sync failed:', err);
    } finally {
      setSyncing(null);
    }
  };

  const handleReview = async (id: string) => {
    setReviewing(id);
    try {
      const res = await fetch(`/api/submissions/${id}/review`, {
        method: 'PATCH',
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error('Review failed:', err);
    } finally {
      setReviewing(null);
    }
  };

  const handleBulkRetry = async () => {
    const failedSubmissions = filteredSubmissions.filter(
      (s) => s.craft_sync_status === 'failed'
    );
    for (const sub of failedSubmissions) {
      await handleRetrySync(sub.id);
    }
  };

  const filteredSubmissions = submissions.filter((sub) => {
    if (filterStore && sub.store_id !== filterStore) return false;
    if (filterControl && sub.control_id !== filterControl) return false;
    if (filterStatus && sub.status !== filterStatus) return false;
    if (filterSyncStatus && sub.craft_sync_status !== filterSyncStatus) return false;
    return true;
  });

  const failedCount = submissions.filter((s) => s.craft_sync_status === 'failed').length;
  const pendingReviewCount = submissions.filter((s) => s.status === 'submitted').length;

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto p-4 py-8">
        <Card>
          <p className="font-heading font-bold text-xl text-center">Loading dashboard...</p>
        </Card>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-nb-orange border-3 border-nb-black">
          <LayoutDashboard className="w-6 h-6" />
        </div>
        <h1 className="font-heading text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <p className="text-3xl font-heading font-bold">{submissions.length}</p>
          <p className="text-nb-gray-dark">Total Submissions</p>
        </Card>
        <Card className={pendingReviewCount > 0 ? 'bg-nb-yellow' : ''}>
          <p className="text-3xl font-heading font-bold">{pendingReviewCount}</p>
          <p className="text-nb-gray-dark">Pending Review</p>
        </Card>
        <Card className={failedCount > 0 ? 'bg-nb-red text-white' : ''}>
          <p className="text-3xl font-heading font-bold">{failedCount}</p>
          <p className={failedCount > 0 ? 'text-white/80' : 'text-nb-gray-dark'}>
            Sync Failed
          </p>
        </Card>
        <Card>
          <p className="text-3xl font-heading font-bold">
            {submissions.filter((s) => s.craft_sync_status === 'success').length}
          </p>
          <p className="text-nb-gray-dark">Synced</p>
        </Card>
      </div>

      <Card className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5" />
          <span className="font-heading font-bold">Filters</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Select
            placeholder="All Stores"
            options={stores.map((s) => ({ value: s.id, label: s.name }))}
            value={filterStore}
            onChange={(e) => setFilterStore(e.target.value)}
          />
          <Select
            placeholder="All Controls"
            options={controls.map((c) => ({ value: c.id, label: c.id }))}
            value={filterControl}
            onChange={(e) => setFilterControl(e.target.value)}
          />
          <Select
            placeholder="All Status"
            options={[
              { value: 'submitted', label: 'Submitted' },
              { value: 'reviewed', label: 'Reviewed' },
            ]}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          />
          <Select
            placeholder="All Sync Status"
            options={[
              { value: 'pending', label: 'Pending' },
              { value: 'success', label: 'Success' },
              { value: 'failed', label: 'Failed' },
            ]}
            value={filterSyncStatus}
            onChange={(e) => setFilterSyncStatus(e.target.value)}
          />
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            variant="secondary"
            onClick={() => {
              setFilterStore('');
              setFilterControl('');
              setFilterStatus('');
              setFilterSyncStatus('');
            }}
          >
            Clear Filters
          </Button>
          {failedCount > 0 && (
            <Button variant="danger" onClick={handleBulkRetry}>
              <RefreshCw className="w-4 h-4" />
              Retry All Failed ({failedCount})
            </Button>
          )}
        </div>
      </Card>

      <div className="space-y-3">
        {filteredSubmissions.length === 0 ? (
          <Card className="text-center py-8">
            <p className="text-nb-gray-dark">No submissions match your filters</p>
          </Card>
        ) : (
          filteredSubmissions.map((sub) => (
            <Card key={sub.id} className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-heading font-bold">{sub.control_id}</span>
                  <span className="text-nb-gray-dark">|</span>
                  <span className="font-bold">{sub.stores?.name}</span>
                </div>
                <p className="text-sm text-nb-gray-dark">
                  {formatPeriodKey(sub.period_key)} - {sub.submitter_name}
                </p>
                <p className="text-xs text-nb-gray-dark mt-1">
                  {formatDateTime(sub.created_at)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={sub.status === 'reviewed' ? 'reviewed' : 'submitted'}>
                  {sub.status}
                </Badge>
                <Badge
                  variant={
                    sub.craft_sync_status === 'success'
                      ? 'success'
                      : sub.craft_sync_status === 'failed'
                      ? 'failed'
                      : 'pending'
                  }
                >
                  {sub.craft_sync_status === 'success' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                  {sub.craft_sync_status === 'failed' && <AlertCircle className="w-3 h-3 mr-1" />}
                  {sub.craft_sync_status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                  {sub.craft_sync_status}
                </Badge>
              </div>

              <div className="flex gap-2">
                <Link href={`/admin/dashboard/submissions/${sub.id}`}>
                  <Button variant="secondary" className="px-3">
                    <Eye className="w-4 h-4" />
                  </Button>
                </Link>

                {sub.status !== 'reviewed' && (
                  <Button
                    variant="success"
                    onClick={() => handleReview(sub.id)}
                    loading={reviewing === sub.id}
                    className="px-3"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </Button>
                )}

                {sub.craft_sync_status === 'failed' && (
                  <Button
                    variant="primary"
                    onClick={() => handleRetrySync(sub.id)}
                    loading={syncing === sub.id}
                    className="px-3"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                )}

                {sub.file_url && (
                  <a
                    href={sub.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nb-button bg-nb-blue px-3"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}
