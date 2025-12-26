'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Store, ArrowLeft, KeyRound } from 'lucide-react';
import { Button, Input, Select, Card } from '@/components/ui';

interface StoreOption {
  id: string;
  name: string;
}

export default function StoreLoginPage() {
  const router = useRouter();
  const [stores, setStores] = useState<StoreOption[]>([]);
  const [selectedStore, setSelectedStore] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingStores, setLoadingStores] = useState(true);

  useEffect(() => {
    async function fetchStores() {
      try {
        const res = await fetch('/api/stores');
        const data = await res.json();
        if (data.stores) {
          setStores(data.stores);
        }
      } catch (err) {
        console.error('Failed to fetch stores:', err);
      } finally {
        setLoadingStores(false);
      }
    }
    fetchStores();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/store-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storeName: selectedStore, pin }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      router.push('/submit');
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
            <div className="p-4 bg-nb-teal border-3 border-nb-black">
              <Store className="w-10 h-10" />
            </div>
          </div>

          <h1 className="font-heading text-3xl font-bold text-center mb-2">
            Store Login
          </h1>
          <p className="text-nb-gray-dark text-center mb-6">
            Select your store and enter the PIN
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Select
              label="Store"
              placeholder="Select your store"
              options={stores.map((s) => ({ value: s.name, label: s.name }))}
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              disabled={loadingStores}
            />

            <div>
              <label className="block font-heading font-bold text-lg mb-2">
                Store PIN
              </label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nb-gray-dark" />
                <input
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full pl-12 pr-4 py-3 font-body text-lg border-3 border-nb-black bg-white focus:outline-none focus:shadow-nb tracking-[0.5em] text-center"
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
              disabled={!selectedStore || pin.length !== 6}
              className="w-full"
            >
              Login
            </Button>
          </form>
        </Card>

        <p className="text-center text-nb-gray-dark mt-6 text-sm">
          Need help? Contact your manager
        </p>
      </div>
    </main>
  );
}
