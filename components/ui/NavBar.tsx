'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  href: string;
  label: string;
}

interface NavBarProps {
  title?: string;
  items?: NavItem[];
  onLogout?: () => void;
  storeName?: string;
  isAdmin?: boolean;
}

export function NavBar({ title = 'Compliance Portal', items = [], onLogout, storeName, isAdmin }: NavBarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b-3 border-nb-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className={`p-2 border-3 border-nb-black ${isAdmin ? 'bg-nb-orange' : 'bg-nb-yellow'}`}>
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="font-heading font-bold text-lg">{title}</span>
              {storeName && (
                <span className="ml-2 text-nb-gray-dark">| {storeName}</span>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  font-heading font-bold px-4 py-2 border-3 border-nb-black
                  transition-all
                  ${pathname === item.href
                    ? 'bg-nb-black text-white'
                    : 'bg-white hover:bg-nb-gray'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-2 font-heading font-bold px-4 py-2 border-3 border-nb-black bg-white hover:bg-nb-red hover:text-white transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            )}
          </div>

          <button
            className="md:hidden p-2 border-3 border-nb-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  block font-heading font-bold px-4 py-3 border-3 border-nb-black
                  ${pathname === item.href
                    ? 'bg-nb-black text-white'
                    : 'bg-white'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
            {onLogout && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center justify-center gap-2 font-heading font-bold px-4 py-3 border-3 border-nb-black bg-nb-red text-white"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
