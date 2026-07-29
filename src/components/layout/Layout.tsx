import React from 'react';
import { Zap } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileNav } from './MobileNav';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0d] text-slate-100 font-sans">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-violet-900 via-purple-800 to-cyan-900 text-white text-xs font-semibold py-2 px-4 text-center flex items-center justify-center gap-2">
        <Zap className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
        <span>Envío express en 24h a todo el país | ITBIS 18% incluido</span>
      </div>

      <Navbar />
      <main className="flex-1 pb-20 md:pb-8">{children}</main>
      <Footer />
      <MobileNav />
    </div>
  );
};
