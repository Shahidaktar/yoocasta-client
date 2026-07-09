import React from 'react';
import * as Icons from 'lucide-react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../data';

interface CategoryBrowserProps {
  selectedCategory: string;
  onSelectCategory: (categoryName: string) => void;
}

// Creative custom curated sub-tags for each specialty hub to show high-tier craftsmanship
const CATEGORY_TAGS: Record<string, string> = {
  'all': "Unified Talents • Gulf-Wide",
  'Actors & Extras': "Cinema • TV Commercials • Extras",
  'Singers': "Classical Vocalists • Opera • Live",
  'Dancers': "Contemporary • Traditional • Studio",
  'Models': "High Fashion • Runway • Commercial",
  'Photographers': "Editorial Shoot • Studio • Campaign",
  'Directors & Crew': "Cinematography • Creative AD • Crew",
  'Promoters & Hosts': "VIP Corporate • Events • Hostesses",
  'Makeup & Hair Artists': "SFX Glamour • Editorial • Backstage",
  'Voice Over Artists': "Narrators • Commercials • Arabic/Eng",
};

// Rich gradients matching the high fashion elite vibe of each specialty hub
const CATEGORY_COLORS: Record<string, { bg: string; border: string; glow: string; textAccent: string }> = {
  'all': { bg: 'from-[#C6007E]/10 to-[#3835A4]/5', border: 'group-hover:border-[#C6007E]/40', glow: 'bg-[#C6007E]/[0.03]', textAccent: 'text-[#C6007E]' },
  'Actors & Extras': { bg: 'from-emerald-500/10 to-emerald-600/5', border: 'group-hover:border-emerald-400/40', glow: 'bg-emerald-400/[0.03]', textAccent: 'text-emerald-500' },
  'Singers': { bg: 'from-violet-500/10 to-violet-600/5', border: 'group-hover:border-violet-400/40', glow: 'bg-violet-400/[0.03]', textAccent: 'text-violet-400' },
  'Dancers': { bg: 'from-pink-500/10 to-pink-600/5', border: 'group-hover:border-pink-400/40', glow: 'bg-pink-400/[0.03]', textAccent: 'text-pink-400' },
  'Models': { bg: 'from-[#C6007E]/10 to-[#3835A4]/5', border: 'group-hover:border-[#C6007E]/40', glow: 'bg-[#C6007E]/[0.03]', textAccent: 'text-[#C6007E]' },
  'Photographers': { bg: 'from-blue-500/10 to-blue-600/5', border: 'group-hover:border-blue-400/40', glow: 'bg-blue-400/[0.03]', textAccent: 'text-blue-400' },
  'Directors & Crew': { bg: 'from-cyan-500/10 to-cyan-600/5', border: 'group-hover:border-cyan-400/40', glow: 'bg-cyan-400/[0.03]', textAccent: 'text-cyan-400' },
  'Promoters & Hosts': { bg: 'from-orange-500/10 to-orange-600/5', border: 'group-hover:border-orange-400/40', glow: 'bg-orange-400/[0.03]', textAccent: 'text-orange-400' },
  'Makeup & Hair Artists': { bg: 'from-rose-500/10 to-rose-600/5', border: 'group-hover:border-rose-400/40', glow: 'bg-rose-400/[0.03]', textAccent: 'text-rose-400' },
  'Voice Over Artists': { bg: 'from-indigo-500/10 to-indigo-600/5', border: 'group-hover:border-indigo-400/40', glow: 'bg-indigo-400/[0.03]', textAccent: 'text-indigo-400' },
};

export default function CategoryBrowser({ selectedCategory, onSelectCategory }: CategoryBrowserProps) {
  return (
    <div className="w-full bg-white py-20 border-y border-[#f2f2f2] relative overflow-hidden">
      {/* Decorative luxury mesh & spotlight gradient */}
      <div className="absolute right-1/4 top-1/2 h-96 w-96 rounded-full bg-[#3835A4]/[0.035] filter blur-[100px] pointer-events-none" />
      <div className="absolute left-10 bottom-10 h-80 w-80 rounded-full bg-[#C6007E]/[0.02] filter blur-[80px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(211, 205, 205, 0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.005)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Outstanding Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 pb-10 border-b border-neutral-200/65">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-neutral-800 font-mono font-black">
              <span className="h-1.5 w-10 bg-gradient-to-r from-[#C6007E] to-[#3835A4] rounded-full animate-pulse" />
              TALENT DEPARTMENTS
            </div>
            <h2 className="font-display text-3xl font-black text-neutral-900 sm:text-5xl tracking-tight leading-none">
              Browse Specialization Hubs
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-lg font-medium leading-relaxed">
            Every division is carefully vetted for screen presence, professional reliability, and regional experience. Click any sector to seamlessly filter the active audition catalog below.
          </p>
        </div>

        {/* Categories Grid - Superb Tactile Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((cat, index) => {
            const IconComponent = (Icons as any)[cat.icon || 'Sparkles'] || Icons.Sparkles;
            const isActive = 
              (cat.id === 'all' && selectedCategory === 'all') || 
              selectedCategory === cat.name;

            const numStr = (index + 1).toString().padStart(2, '0');
            const subTag = CATEGORY_TAGS[cat.name] || CATEGORY_TAGS['all'];
            const colorMeta = CATEGORY_COLORS[cat.name] || CATEGORY_COLORS['all'];

            return (
              <motion.button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id === 'all' ? 'all' : cat.name)}
                whileHover={{ y: -6, scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                className={`group relative p-6 rounded-3xl flex flex-col justify-between items-stretch text-left transition-all duration-300 cursor-pointer overflow-hidden border ${
                  isActive 
                  ? 'border-transparent bg-gradient-to-br from-[#3835A4] to-[#C6007E] text-white shadow-xl shadow-[#3835A4]/25' 
                  : `border-neutral-200/80 bg-neutral-50/60 hover:bg-white ${colorMeta.border} hover:shadow-lg hover:shadow-neutral-100`
                }`}
                style={{ contentVisibility: 'auto' }}
              >
                {/* Micro Ambient background glow in non-active hover state */}
                {!isActive && (
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${colorMeta.bg} pointer-events-none`} />
                )}

                {/* Top Section: Number + Glow indicator */}
                <div className="flex items-center justify-between relative z-10">
                  <span className={`text-[10px] font-mono tracking-widest font-black ${
                    isActive ? 'text-pink-200' : 'text-neutral-400 group-hover:text-neutral-900'
                  }`}>
                    DEP // {numStr}
                  </span>
                  
                  {/* High fashion visual badge */}
                  <span className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-white scale-125 shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-neutral-350 group-hover:scale-125'
                  }`} />
                </div>

                {/* Middle Section: Elegant visual icon ring with micro-effects */}
                <div className="my-7 relative z-10">
                  <div className={`inline-flex p-3.5 rounded-2xl transition-all duration-300 ${
                    isActive 
                    ? 'bg-white text-[#3835A4] shadow-lg shadow-white/20' 
                    : 'bg-white text-neutral-800 border border-neutral-200 shadow-sm group-hover:bg-gradient-to-br group-hover:from-[#C6007E] group-hover:to-[#3835A4] group-hover:text-white group-hover:border-transparent'
                  }`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                </div>

                {/* Bottom Section: Title, tag, count */}
                <div className="space-y-2.5 relative z-10 mt-auto">
                  <div>
                    <h3 className={`font-display text-base font-black tracking-tight ${
                      isActive ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {cat.name}
                    </h3>
                    {/* Specialized custom tag descriptors to look premium and fully realized */}
                    <p className={`text-[10px] font-medium tracking-wide mt-0.5 ${
                      isActive ? 'text-neutral-200' : 'text-neutral-400 group-hover:text-neutral-600'
                    }`}>
                      {subTag}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-dashed border-neutral-200/50 group-hover:border-neutral-300/80">
                    <span className={`text-[10px] font-mono font-bold ${
                      isActive ? 'text-pink-100' : 'text-neutral-500 group-hover:text-[#3835A4]'
                    }`}>
                      {cat.count.toLocaleString()} ACTIVE
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-[8px] uppercase tracking-wider font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-neutral-700">
                        View
                      </span>
                      <Icons.ArrowUpRight className={`h-3.5 w-3.5 transition-transform duration-300 ${
                        isActive ? 'text-white translate-x-0.5 -translate-y-0.5' : 'text-neutral-400 group-hover:text-[#3835A4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                      }`} />
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

