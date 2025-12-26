'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavBar } from '@/components/ui';

interface AdminUser {
  type: 'admin';
  email: string;
}

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/me');
        const data = await res.json();

        if (!data.user || data.user.type !== 'admin') {
          router.push('/admin');
          return;
        }

        setUser(data.user);
      } catch {
        router.push('/admin');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin');
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
    { href: '/admin/dashboard', label: 'Dashboard' },
    { href: '/admin/dashboard/config', label: 'Config' },
  ];

  return (
    <div className="min-h-screen bg-nb-gray">
      <NavBar
        title="Admin Portal"
        isAdmin
        items={navItems}
        onLogout={handleLogout}
      />
      {children}
    </div>
  );
}
