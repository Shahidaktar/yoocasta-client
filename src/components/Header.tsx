import React, { useState } from 'react';
import { Sparkles, MessageSquare, Plus, Flame, ShieldAlert, CheckCircle2, Menu, X } from 'lucide-react';

interface HeaderProps {
  onSearchClick: () => void;
  onPostCastingClick: () => void;
  onCreateProfileClick: () => void;
  onPremiumClick: () => void;
  onLoginClick: () => void;
  registeredTalentsCount: number;
  openCastingsCount: number;
}

export default function Header({
  onSearchClick,
  onPostCastingClick,
  onCreateProfileClick,
  onPremiumClick,
  onLoginClick,
  registeredTalentsCount,
  openCastingsCount,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/50 bg-white/90 backdrop-blur-md shadow-sm">
      {/* ✦ HIGH FASHION SCROLLING RUNWAY TICKER BANNER (Outstanding Marquee Layout) ✦ */}
      <div className="w-full bg-[#3835a4] py-3 overflow-hidden select-none relative z-20 border-b border-white/10">
        <div className="flex whitespace-nowrap animate-marquee gap-12 text-[10px] uppercase font-mono font-black tracking-[0.2em] text-white">
          <div className="flex items-center gap-12 shrink-0">
            <span>✦ LIVE AUDITIONS OPEN: DUBAI DESIGN DISTRICT</span>
            <span className="text-pink-200">★ CO-LEAD COMMERCIAL ROLES BY EMIRATES</span>
            <span>✦ RIYADH FASHION WEEK CASTING NOW ACTIVE</span>
            <span className="text-pink-200">★ AED 12,500 WEEKEND GALA HOSTESS SLOTS</span>
            <span>✦ FEATURE FILM BACKSTAGE DIRECTORS SCOUTING</span>
            <span className="text-pink-200">★ 100% ESCROW PROTECTED COMMISSIONS</span>
          </div>
          <div className="flex items-center gap-12 shrink-0">
            <span>✦ LIVE AUDITIONS OPEN: DUBAI DESIGN DISTRICT</span>
            <span className="text-pink-200">★ CO-LEAD COMMERCIAL ROLES BY EMIRATES</span>
            <span>✦ RIYADH FASHION WEEK CASTING NOW ACTIVE</span>
            <span className="text-pink-200">★ AED 12,500 WEEKEND GALA HOSTESS SLOTS</span>
            <span>✦ FEATURE FILM BACKSTAGE DIRECTORS SCOUTING</span>
            <span className="text-pink-200">★ 100% ESCROW PROTECTED COMMISSIONS</span>
          </div>
        </div>
      </div>

      {/* Main Bar Navigation Container */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 relative">
        
        {/* Brand Logo - Aligned LEFT on both Desktop and Mobile */}
        <div className="flex items-center z-50">
          <a href="#" className="flex items-center group">
            <img 
              src={isMenuOpen ? "/logo.png" : "https://pub-9a6daccdd56649a4bb690162026e4c5d.r2.dev/images/logo-black.png"} 
              alt="Yoocasta Logo" 
              className="h-9 w-auto sm:h-10 object-contain transition-transform group-hover:scale-105"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
          <a href="#" className="hover:text-[#3835a4] transition-colors">
            Talent Pool
            <span className="ml-1.5 inline-block h-2 w-2 rounded-full bg-[#C6007E] animate-pulse"></span>
          </a>
          <a href="#" className="hover:text-[#3835a4] transition-colors">
            Casting Calls
          </a>
          <a href="#" className="hover:text-[#3835a4] transition-colors">Our Work</a>
          <a href="#" className="hover:text-[#3835a4] transition-colors">Success Stories</a>
          <a href="#" className="hover:text-[#3835a4] transition-colors">FAQ</a>
        </nav>

        {/* Desktop Action Buttons Interface */}
        <div className="hidden md:flex items-center gap-1.5 sm:gap-3">
          <button
            onClick={onLoginClick}
            className="text-xs font-mono tracking-wider font-bold text-neutral-500 hover:text-[#3835a4] px-3 py-2 cursor-pointer transition-colors"
          >
            LOG IN
          </button>

          <button
            onClick={onCreateProfileClick}
            className="inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 hover:border-neutral-400 transition-all cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5 text-[#C6007E] shrink-0" />
            <span>Join Talent</span>
          </button>

          <button
            onClick={onPostCastingClick}
            className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#C6007E] to-[#3835A4] px-4 py-2 text-xs font-bold text-white hover:opacity-95 transition-all hover:scale-[1.02] shadow-md shadow-[#3835A4]/25 cursor-pointer"
          >
            <span>Post Casting</span>
          </button>
        </div>

        {/* MOBILE LAYOUT ONLY: Right Side Hamburger Trigger */}
        <div className="flex md:hidden items-center z-50">
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="p-2 text-neutral-800 hover:bg-neutral-100 rounded-lg transition-colors focus:outline-none relative"
          >
            {isMenuOpen ? <X className="h-6 w-6 text-white fixed top-[68px] right-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Full-Screen Solid High-Fashion Mobile Overlay */}
      <div 
        className={`fixed inset-0 h-screen w-screen z-40 bg-gradient-to-b from-[#3835a4] to-[#1e1c5c] transition-all duration-300 ease-out md:hidden flex flex-col justify-between p-8 pt-36 ${
          isMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 pointer-events-none invisible'
        }`}
      >
        {/* Navigation Links */}
        <nav className="flex flex-col gap-5 text-lg font-black uppercase font-mono tracking-[0.15em] text-white">
          <a 
            href="#" 
            onClick={toggleMenu}
            className="flex items-center justify-between border-b border-white/10 pb-4 hover:text-pink-200 transition-colors"
          >
            <span>Talent Pool</span>
            <span className="h-2.5 w-2.5 rounded-full bg-[#C6007E] animate-pulse"></span>
          </a>
          <a 
            href="#" 
            onClick={toggleMenu}
            className="border-b border-white/10 pb-4 hover:text-pink-200 transition-colors"
          >
            Casting Calls
          </a>
          <a 
            href="#" 
            onClick={toggleMenu}
            className="border-b border-white/10 pb-4 hover:text-pink-200 transition-colors"
          >
            Our Work
          </a>
          <a 
            href="#" 
            onClick={toggleMenu}
            className="border-b border-white/10 pb-4 hover:text-pink-200 transition-colors"
          >
            Success Stories
          </a>
          <a 
            href="#" 
            onClick={toggleMenu}
            className="border-b border-white/10 pb-4 hover:text-pink-200 transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Action Buttons Footer */}
        <div className="flex flex-col gap-4 mb-8">
          <button
            onClick={() => { toggleMenu(); onPostCastingClick(); }}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C6007E] to-[#3835A4] py-4 text-sm font-bold text-white shadow-xl transition-all"
          >
            <span>Post Casting</span>
          </button>

          <button
            onClick={() => { toggleMenu(); onCreateProfileClick(); }}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white py-4 text-sm font-bold text-[#3835a4] hover:bg-neutral-50 transition-all"
          >
            <Plus className="h-4 w-4 text-[#C6007E]" />
            <span>Join Talent</span>
          </button>

          <button
            onClick={() => { toggleMenu(); onLoginClick(); }}
            className="w-full py-4 text-center text-sm font-mono tracking-wider font-black text-white border-2 border-white/30 hover:border-white hover:bg-white/10 rounded-full transition-all"
          >
            LOG IN
          </button>
        </div>
      </div>
    </header>
  );
}