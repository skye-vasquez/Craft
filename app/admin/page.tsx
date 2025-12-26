'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserCog, ArrowLeft, Mail, Lock } from 'lucide-react';
import { Button, Input, Card } from '@/components/ui';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      router.push('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-nb-gray flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-heading font-bold mb-6 hover:underline"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>

        <Card>
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-nb-orange border-3 border-nb-black">
              <UserCog className="w-10 h-10" />
            </div>
          </div>

          <h1 className="font-heading text-3xl font-bold text-center mb-2">
            Admin Login
          </h1>
          <p className="text-nb-gray-dark text-center mb-6">
            Access the management dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-heading font-bold text-lg mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nb-gray-dark" />
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 font-body text-lg border-3 border-nb-black bg-white focus:outline-none focus:shadow-nb"
                />
              </div>
            </div>

            <div>
              <label className="block font-heading font-bold text-lg mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nb-gray-dark" />
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 font-body text-lg border-3 border-nb-black bg-white focus:outline-none focus:shadow-nb"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-nb-red text-white font-bold border-3 border-nb-black">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              disabled={!email || !password}
              className="w-full"
            >
              Login
            </Button>
          </form>
        </Card>

        <p className="text-center text-nb-gray-dark mt-6 text-sm">
          Admin access only
        </p>
      </div>
    </main>
  );
}
