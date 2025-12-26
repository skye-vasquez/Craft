'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { NavBar } from '@/components/ui';

interface User {
  type: 'store' | 'admin';
  storeId?: string;
  storeName?: string;
}

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/me');
        const data = await res.json();

        if (!data.user || data.user.type !== 'store') {
          router.push('/login');
          return;
        }

        setUser(data.user);
      } catch {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-nb-gray flex items-center justify-center">
        <div className="nb-card">
          <p className="font-heading font-bold text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const navItems = [
    { href: '/submit', label: 'Submit' },
    { href: '/history', label: 'History' },
  ];

  return (
    <div className="min-h-screen bg-nb-gray">
      <NavBar
        title="Compliance Portal"
        storeName={user.storeName}
        items={navItems}
        onLogout={handleLogout}
      />
      {children}
    </div>
  );
}
