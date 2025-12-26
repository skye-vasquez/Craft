'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Send, Plus } from 'lucide-react';
import { Button, Select, Input, Textarea, FileUpload, Card, Badge } from '@/components/ui';

interface Control {
  id: string;
  name: string;
  period_type: 'weekly' | 'monthly';
}

interface SubmissionResult {
  id: string;
  control_id: string;
  period_key: string;
  craft_sync_status: string;
}

const DRAFT_KEY = 'compliance-submission-draft';

export default function SubmitPage() {
  const router = useRouter();
  const [controls, setControls] = useState<Control[]>([]);
  const [controlId, setControlId] = useState('');
  const [submissionDate, setSubmissionDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [submitterName, setSubmitterName] = useState('');
  const [submitterEmail, setSubmitterEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState<SubmissionResult | null>(null);
  const [periodFilter, setPeriodFilter] = useState<'all' | 'weekly' | 'monthly'>('all');

  useEffect(() => {
    async function fetchControls() {
      try {
        const res = await fetch('/api/controls');
        const data = await res.json();
        if (data.controls) {
          setControls(data.controls);
        }
      } catch (err) {
        console.error('Failed to fetch controls:', err);
      }
    }
    fetchControls();

    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        if (parsed.notes) setNotes(parsed.notes);
        if (parsed.submitterName) setSubmitterName(parsed.submitterName);
        if (parsed.submitterEmail) setSubmitterEmail(parsed.submitterEmail);
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  useEffect(() => {
    const draft = { notes, submitterName, submitterEmail };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  }, [notes, submitterName, submitterEmail]);

  const filteredControls = controls.filter((c) => {
    if (periodFilter === 'all') return true;
    return c.period_type === periodFilter;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!notes && !file) {
      setError('Please provide notes or upload a file');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('control_id', controlId);
      formData.append('submission_date', submissionDate);
      formData.append('submitter_name', submitterName);
      formData.append('submitter_email', submitterEmail);
      formData.append('notes', notes);
      if (file) {
        formData.append('file', file);
      }

      const res = await fetch('/api/submissions', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Submission failed');
        return;
      }

      localStorage.removeItem(DRAFT_KEY);
      setSuccess(data.submission);
    } catch (err) {
      console.error('Submission error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleNewSubmission = () => {
    setSuccess(null);
    setControlId('');
    setNotes('');
    setFile(null);
    setSubmissionDate(new Date().toISOString().split('T')[0]);
  };

  if (success) {
    const control = controls.find((c) => c.id === success.control_id);
    return (
      <main className="max-w-2xl mx-auto p-4 py-8">
        <Card className="text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-nb-green border-3 border-nb-black rounded-full">
              <CheckCircle2 className="w-12 h-12" />
            </div>
          </div>

          <h1 className="font-heading text-3xl font-bold mb-2">
            Submission Received
          </h1>

          <p className="text-nb-gray-dark mb-6">
            Your evidence has been submitted successfully
          </p>

          <div className="bg-nb-gray border-3 border-nb-black p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between">
              <span className="font-bold">Submission ID:</span>
              <span className="font-mono">{success.id.slice(0, 8)}...</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Control:</span>
              <span>{control?.name || success.control_id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Period:</span>
              <span>{success.period_key}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold">Sync Status:</span>
              <Badge
                variant={
                  success.craft_sync_status === 'success'
                    ? 'success'
                    : success.craft_sync_status === 'failed'
                    ? 'failed'
                    : 'pending'
                }
              >
                {success.craft_sync_status}
              </Badge>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="primary"
              onClick={handleNewSubmission}
              className="flex-1"
            >
              <Plus className="w-5 h-5" />
              Submit Another
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push('/history')}
              className="flex-1"
            >
              View History
            </Button>
          </div>
        </Card>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto p-4 py-8">
      <Card>
        <h1 className="font-heading text-3xl font-bold mb-6">
          Submit Evidence
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-2 mb-4">
            {(['all', 'weekly', 'monthly'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setPeriodFilter(filter)}
                className={`
                  px-4 py-2 font-heading font-bold border-3 border-nb-black
                  ${periodFilter === filter ? 'bg-nb-black text-white' : 'bg-white'}
                `}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          <Select
            label="Control"
            placeholder="Select a control"
            options={filteredControls.map((c) => ({
              value: c.id,
              label: `${c.id}: ${c.name} (${c.period_type})`,
            }))}
            value={controlId}
            onChange={(e) => setControlId(e.target.value)}
          />

          <Input
            label="Date"
            type="date"
            value={submissionDate}
            onChange={(e) => setSubmissionDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />

          <Input
            label="Your Name"
            placeholder="Enter your name"
            value={submitterName}
            onChange={(e) => setSubmitterName(e.target.value)}
            required
          />

          <Input
            label="Email (optional)"
            type="email"
            placeholder="your.email@example.com"
            value={submitterEmail}
            onChange={(e) => setSubmitterEmail(e.target.value)}
          />

          <Textarea
            label="Notes"
            placeholder="Describe the evidence being submitted..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />

          <FileUpload
            label="Evidence File (optional)"
            onChange={setFile}
            value={file}
          />

          {!notes && !file && (
            <p className="text-nb-orange font-bold text-sm">
              Please provide notes or upload a file
            </p>
          )}

          {error && (
            <div className="p-3 bg-nb-red text-white font-bold border-3 border-nb-black">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={!controlId || !submitterName || (!notes && !file)}
            className="w-full"
          >
            <Send className="w-5 h-5" />
            Submit Evidence
          </Button>
        </form>
      </Card>
    </main>
  );
}
