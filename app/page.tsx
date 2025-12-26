import Link from 'next/link';
import { Shield, Store, UserCog } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-nb-gray flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="nb-card text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-nb-yellow border-3 border-nb-black">
              <Shield className="w-12 h-12" />
            </div>
          </div>
          <h1 className="font-heading text-4xl font-bold mb-2">
            Compliance Portal
          </h1>
          <p className="text-nb-gray-dark text-lg">
            Metro Wireless Plus Evidence Management
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/login" className="block">
            <div className="nb-card hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-nb-sm transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-nb-teal border-3 border-nb-black">
                  <Store className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <h2 className="font-heading text-xl font-bold">Store Login</h2>
                  <p className="text-nb-gray-dark">Submit evidence for your store</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/admin" className="block">
            <div className="nb-card hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-nb-sm transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-nb-orange border-3 border-nb-black">
                  <UserCog className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <h2 className="font-heading text-xl font-bold">Admin Login</h2>
                  <p className="text-nb-gray-dark">Manage submissions & configuration</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <p className="text-center text-nb-gray-dark mt-8 text-sm">
          Metro Wireless Plus Compliance Hub
        </p>
      </div>
    </main>
  );
}
