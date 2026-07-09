import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import {
  MapPin,
  Landmark,
  Clock,
  ArrowUpRight,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES } from '../data';
import { CastingCall } from '../types';

interface TalentAndCastingSectionProps {
  selectedCategory: string;
  onSelectCategory: (categoryName: string) => void;
  castings: CastingCall[];
  onCastingClick: (casting: CastingCall) => void;
}

const TIME_ANCHOR = new Date('2026-07-03').getTime();
const MS_IN_DAY = 1000 * 3600 * 24;

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

type ViewMode = 'categories' | 'castings';

export default function TalentAndCastingSection({
  selectedCategory,
  onSelectCategory,
  castings,
  onCastingClick,
}: TalentAndCastingSectionProps) {
  const [view, setView] = useState<ViewMode>('categories');

  const headerCopy =
    view === 'categories'
      ? {
          title: 'Browse Specialization Hubs',
          desc: 'Every division is carefully vetted for screen presence, professional reliability, and regional experience. Click any sector to seamlessly filter the active audition catalog below.',
        }
      : {
          title: 'Active Casting Bulletins',
          desc: 'Explore high-budget commercial campaigns, feature films, and VIP event hosting roles. Secure your next major placement with zero intermediate agency fees.',
        };

  return (
    <div id="directors-board" className="w-full bg-white py-8 border-y border-[#f2f2f2] relative overflow-hidden">
      <div className="absolute right-1/4 top-1/2 h-96 w-96 rounded-full bg-[#3835A4]/[0.035] filter blur-[100px] pointer-events-none" />
      <div className="absolute left-10 bottom-10 h-80 w-80 rounded-full bg-[#C6007E]/[0.02] filter blur-[80px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 pb-10 border-b border-neutral-200/65">
          <div className="space-y-3 max-w-2xl">
            <h2 className="font-display text-3xl font-black text-neutral-900 sm:text-5xl tracking-tight leading-none">
              {headerCopy.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-lg font-medium leading-relaxed">
              {headerCopy.desc}
            </p>
          </div>

          <div className="flex items-center p-1.5 bg-neutral-100/80 backdrop-blur-md rounded-2xl border border-neutral-200/60 shrink-0 self-start lg:self-auto relative">
            <button
              onClick={() => setView('categories')}
              className={`relative px-5 py-3 text-xs font-black rounded-xl tracking-wider transition-colors duration-300 z-10 cursor-pointer whitespace-nowrap ${
                view === 'categories' ? 'text-white' : 'text-neutral-500 hover:text-[#3835A4]'
              }`}
            >
              {view === 'categories' && (
                <motion.div
                  layoutId="activeSectionTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#C6007E] to-[#3835A4] rounded-xl -z-10 shadow-md"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              Talent Departments
            </button>
            <button
              onClick={() => setView('castings')}
              className={`relative px-5 py-3 text-xs font-black rounded-xl tracking-wider transition-colors duration-300 z-10 cursor-pointer whitespace-nowrap ${
                view === 'castings' ? 'text-white' : 'text-neutral-500 hover:text-[#3835A4]'
              }`}
            >
              {view === 'castings' && (
                <motion.div
                  layoutId="activeSectionTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#C6007E] to-[#3835A4] rounded-xl -z-10 shadow-md"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              Casting Opportunities
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'categories' ? (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
            >
              {CATEGORIES.map((cat) => {
                const IconComponent = (Icons as any)[cat.icon || 'Sparkles'] || Icons.Sparkles;
                const isActive =
                  (cat.id === 'all' && selectedCategory === 'all') ||
                  selectedCategory === cat.name;

                const subTag = CATEGORY_TAGS[cat.name] || CATEGORY_TAGS['all'];
                const colorMeta = CATEGORY_COLORS[cat.name] || CATEGORY_COLORS['all'];

                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id === 'all' ? 'all' : cat.name)}
                    whileHover={{ y: -6, scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    className={`group relative p-6 pt-10 rounded-3xl flex flex-col justify-between items-stretch text-left transition-all duration-300 cursor-pointer overflow-hidden border ${
                      isActive
                        ? 'border-transparent bg-gradient-to-br from-[#3835A4] to-[#C6007E] text-white shadow-xl shadow-[#3835A4]/25'
                        : `border-neutral-200/80 bg-neutral-50/60 hover:bg-white ${colorMeta.border} hover:shadow-lg hover:shadow-neutral-100`
                    }`}
                    style={{ contentVisibility: 'auto' }}
                  >
                    {!isActive && (
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${colorMeta.bg} pointer-events-none`} />
                    )}

                    <div className="mb-6 relative z-10">
                      <div className={`inline-flex p-3.5 rounded-2xl transition-all duration-300 ${
                        isActive
                          ? 'bg-white text-[#3835A4] shadow-lg shadow-white/20'
                          : 'bg-white text-neutral-800 border border-neutral-200 shadow-sm group-hover:bg-gradient-to-br group-hover:from-[#C6007E] group-hover:to-[#3835A4] group-hover:text-white group-hover:border-transparent'
                      }`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="space-y-2.5 relative z-10 mt-auto">
                      <div>
                        <h3 className={`font-display text-base font-black tracking-tight ${
                          isActive ? 'text-white' : 'text-neutral-900'
                        }`}>
                          {cat.name}
                        </h3>
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
                          <span className={`text-[8px] uppercase tracking-wider font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                            isActive ? 'text-white' : 'text-neutral-700'
                          }`}>
                            View
                          </span>
                          <ArrowUpRight className={`h-3.5 w-3.5 transition-transform duration-300 ${
                            isActive ? 'text-white translate-x-0.5 -translate-y-0.5' : 'text-neutral-400 group-hover:text-[#3835A4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                          }`} />
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          ) : castings.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="text-center py-24 bg-neutral-50 border border-dashed border-neutral-200/80 rounded-[2rem] max-w-2xl mx-auto"
            >
              <div className="h-14 w-14 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="h-7 w-7 text-neutral-400" />
              </div>
              <h3 className="font-display text-xl font-black text-neutral-950">No active briefs listed</h3>
              <p className="text-sm text-neutral-500 mt-2 max-w-sm mx-auto leading-relaxed">
                There are currently no open roles published under this segment. Check back shortly as new campaigns launch daily.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="castings"
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
            >
              {castings.map((casting, index) => {
                const expiryTime = new Date(casting.expiryDate).getTime();
                const calculatedDaysLeft = Math.ceil((expiryTime - TIME_ANCHOR) / MS_IN_DAY);
                
                const isForcedExpired = index >= castings.length - 2;
                const isExpired = calculatedDaysLeft <= 0 || isForcedExpired;
                const daysLeft = isForcedExpired ? 0 : calculatedDaysLeft;

                return (
                  <motion.div
                    key={casting.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onClick={() => onCastingClick(casting)}
                    className="bg-white flex flex-col rounded-[2.25rem] overflow-hidden border border-neutral-200 hover:border-[#3835A4]/40 hover:shadow-2xl transition-all duration-500 cursor-pointer h-full group relative"
                    style={{ contentVisibility: 'auto' }}
                  >
                    <div className="relative h-56 w-full overflow-hidden bg-neutral-100 shrink-0">
                      <img
                        src={casting.imageUrl}
                        alt={casting.title}
                        className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-90"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-neutral-950/25 to-transparent transition-opacity group-hover:via-neutral-950/30" />
                      <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                        <span className="bg-white/95 backdrop-blur-md text-neutral-900 text-[9px] font-mono font-black tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-xl shadow-md border border-neutral-200/50">
                          {casting.category}
                        </span>
                        <span className="bg-gradient-to-r from-[#C6007E] to-[#3835A4] text-white text-[9px] font-mono font-black tracking-[0.15em] px-3.5 py-1.5 rounded-xl border border-white/10 shadow-lg">
                          {casting.paymentType.toUpperCase()}
                        </span>
                      </div>
                      
                      {!isExpired && (
                        <div className="absolute bottom-5 left-5 z-10 flex items-center gap-1.5 text-[9px] font-mono text-neutral-200 bg-neutral-950/80 backdrop-blur-md py-2 px-3.5 rounded-xl border border-white/10 shadow-sm font-bold">
                          <Clock className="h-3.5 w-3.5 text-[#C6007E] animate-pulse" />
                          <span>EXPIRES IN {daysLeft} DAYS</span>
                        </div>
                      )}
                    </div>

                    <div className="p-8 flex flex-col flex-grow justify-between relative bg-white">
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-[9px] text-neutral-400 tracking-wider uppercase font-black">
                          <Landmark className="h-3 w-3 text-neutral-400" />
                          <span>{casting.client}</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>

                        <h3 className="font-display text-xl sm:text-2xl font-black text-neutral-900 group-hover:text-[#3835A4] transition-colors tracking-tight line-clamp-1 leading-tight">
                          {casting.title}
                        </h3>

                        <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed font-medium">
                          {casting.description}
                        </p>
                      </div>

                      <div className="pt-6 mt-6 border-t border-neutral-100 flex flex-col gap-4">
                        <div className="flex items-start gap-3.5 group/meta">
                          <div className="h-9 w-9 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-center text-neutral-500 shrink-0 group-hover/meta:border-neutral-900/40 transition-colors">
                            <MapPin className="h-4 w-4" />
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-xs text-neutral-900 font-extrabold tracking-wide">{casting.location}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-3.5 group/meta">
                          <div className="h-9 w-9 rounded-xl bg-[#3835A4]/5 border border-[#3835A4]/10 flex items-center justify-center text-[#3835A4] shrink-0 group-hover/meta:border-[#3835A4] transition-colors">
                            <DollarSign className="h-4 w-4" />
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-xs text-neutral-950 font-black font-mono tracking-wide">{casting.rate}</span>
                          </div>
                        </div>
                      </div>

                      {/* Cleaned Bottom Application Bar */}
                      <div className="pt-6 mt-6 border-t border-dashed border-neutral-200 flex items-center justify-between">
                        <div>
                          {isExpired ? (
                            <span className="inline-flex items-center text-[9px] font-mono font-black bg-red-50 text-red-600 border border-red-200/60 px-2.5 py-1 rounded-lg tracking-wider">
                              EXPIRED
                            </span>
                          ) : (
                            <div className="w-1" /> // Structural placeholder when active
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-black uppercase text-neutral-500 group-hover:text-[#3835A4] transition-colors duration-300">
                            Apply
                          </span>
                          <div className="p-1.5 rounded-xl bg-neutral-50 border border-neutral-200/60 group-hover:bg-gradient-to-br group-hover:from-[#C6007E] group-hover:to-[#3835A4] group-hover:text-white group-hover:border-transparent transition-all duration-300">
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}