import React, { useState } from 'react';
import { CastingCall } from '../types';
import { 
  Briefcase, 
  MapPin, 
  ChevronRight, 
  Landmark, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CastingCallsSectionProps {
  castings: CastingCall[];
  onCastingClick: (casting: CastingCall) => void;
}

export default function CastingCallsSection({ castings, onCastingClick }: CastingCallsSectionProps) {
  const [activeBoard, setActiveBoard] = useState<'Opportunities' | 'Crew'>('Opportunities');

  // Filter based on selected tabs
  const filteredCastings = castings.filter(c => {
    if (activeBoard === 'Opportunities') {
      return c.category !== 'Directors & Crew';
    } else {
      return c.category === 'Directors & Crew';
    }
  });

  return (
    <div id="directors-board" className="w-full bg-white py-28 relative overflow-hidden border-b border-[#f2f2f2]">
      
      {/* Editorial Luxury Accents */}
      <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-[#3835A4]/[0.035] filter blur-[120px] pointer-events-none" />
      <div className="absolute left-10 bottom-10 h-80 w-80 rounded-full bg-[#C6007E]/[0.025] filter blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading & Sub text - Ultra Clean Editorial Style */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-10 pb-10 border-b border-neutral-200/80">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-neutral-800 font-mono font-black">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3835A4] animate-pulse" />
              HOT BRIEF BULLETINS
            </div>
            <h2 className="font-display text-3xl font-black text-neutral-900 sm:text-5xl tracking-tight leading-none">
              Active Casting Bulletins
            </h2>
            <p className="text-sm text-neutral-500 font-medium leading-relaxed">
              Explore high-budget commercial campaigns, feature films, and VIP event hosting roles. Secure your next major placement with zero intermediate agency fees.
            </p>
          </div>

          {/* Premium Segmented Swapper with Motion Slider */}
          <div className="flex items-center p-1.5 bg-neutral-100/80 backdrop-blur-md rounded-2xl border border-neutral-200/60 shrink-0 self-start lg:self-auto relative">
            <button
              onClick={() => setActiveBoard('Opportunities')}
              className={`relative px-5 py-3 text-xs font-black rounded-xl tracking-wider transition-colors duration-300 z-10 cursor-pointer ${
                activeBoard === 'Opportunities' ? 'text-white' : 'text-neutral-500 hover:text-[#3835A4]'
              }`}
            >
              {activeBoard === 'Opportunities' && (
                <motion.div
                  layoutId="activeCastingTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#C6007E] to-[#3835A4] rounded-xl -z-10 shadow-md"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              Performance & Runway Briefs
            </button>
            <button
              onClick={() => setActiveBoard('Crew')}
              className={`relative px-5 py-3 text-xs font-black rounded-xl tracking-wider transition-colors duration-300 z-10 cursor-pointer ${
                activeBoard === 'Crew' ? 'text-white' : 'text-neutral-500 hover:text-[#3835A4]'
              }`}
            >
              {activeBoard === 'Crew' && (
                <motion.div
                  layoutId="activeCastingTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#C6007E] to-[#3835A4] rounded-xl -z-10 shadow-md"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              Production & Crew Jobs
            </button>
          </div>
        </div>

        {/* Casting Cards Layout with Motion */}
        <AnimatePresence mode="wait">
          {filteredCastings.length === 0 ? (
            <motion.div
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
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
            >
              {filteredCastings.map((casting, index) => {
                // Calculate relative dates
                const daysLeft = Math.ceil(
                  (new Date(casting.expiryDate).getTime() - new Date('2026-06-23').getTime()) / (1000 * 3600 * 24)
                );
                
                const isExpired = daysLeft <= 0;

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
                    {/* Visual Card Cover */}
                    <div className="relative h-56 w-full overflow-hidden bg-neutral-100 shrink-0">
                      <img
                        src={casting.imageUrl}
                        alt={casting.title}
                        className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-90"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      
                      {/* Premium Linear Ambient Shadow Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-neutral-950/25 to-transparent transition-opacity group-hover:via-neutral-950/30" />
                      
                      {/* Card Category Tagging & Badges */}
                      <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                        <span className="bg-white/95 backdrop-blur-md text-neutral-900 text-[9px] font-mono font-black tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-xl shadow-md border border-neutral-200/50">
                          {casting.category}
                        </span>
                        <span className="bg-gradient-to-r from-[#C6007E] to-[#3835A4] text-white text-[9px] font-mono font-black tracking-[0.15em] px-3.5 py-1.5 rounded-xl border border-white/10 shadow-lg">
                          {casting.paymentType.toUpperCase()}
                        </span>
                      </div>

                      {/* Expiry / Urgency counter */}
                      <div className="absolute bottom-5 left-5 z-10 flex items-center gap-1.5 text-[9px] font-mono text-neutral-200 bg-neutral-950/80 backdrop-blur-md py-2 px-3.5 rounded-xl border border-white/10 shadow-sm font-bold">
                        <Clock className="h-3.5 w-3.5 text-[#C6007E] animate-pulse" />
                        <span>{isExpired ? 'REGISTRATION CLOSED' : `EXPIRES IN ${daysLeft} DAYS`}</span>
                      </div>
                    </div>

                    {/* Card Body Information */}
                    <div className="p-8 flex flex-col flex-grow justify-between relative bg-white">
                      <div className="space-y-4">
                        
                        {/* Client details with verification badge */}
                        <div className="flex items-center gap-1.5 text-[9px] font-mono text-neutral-400 tracking-[0.25em] uppercase font-black">
                          <Landmark className="h-3 w-3 text-neutral-400" />
                          <span>{casting.client}</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>

                        {/* Campaign Title */}
                        <h3 className="font-display text-xl sm:text-2xl font-black text-neutral-900 group-hover:text-[#3835A4] transition-colors tracking-tight line-clamp-1 leading-tight">
                          {casting.title}
                        </h3>

                        {/* Brief descriptive copy */}
                        <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed font-medium">
                          {casting.description}
                        </p>
                      </div>

                      {/* Premium Editorial Vertical Metadata Stack */}
                      <div className="pt-6 mt-6 border-t border-neutral-100 flex flex-col gap-4">
                        {/* Location Element */}
                        <div className="flex items-start gap-3.5 group/meta">
                          <div className="h-9 w-9 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-center text-neutral-500 shrink-0 group-hover/meta:border-neutral-900/40 transition-colors">
                            <MapPin className="h-4 w-4" />
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-[8px] uppercase tracking-[0.2em] font-mono text-neutral-400 font-bold block">PROJECT REGION</span>
                            <span className="text-xs text-neutral-900 font-extrabold tracking-wide">{casting.location}</span>
                          </div>
                        </div>

                        {/* Compensation Element */}
                        <div className="flex items-start gap-3.5 group/meta">
                          <div className="h-9 w-9 rounded-xl bg-[#3835A4]/5 border border-[#3835A4]/10 flex items-center justify-center text-[#3835A4] shrink-0 group-hover/meta:border-[#3835A4] transition-colors">
                            <DollarSign className="h-4 w-4" />
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-[8px] uppercase tracking-[0.2em] font-mono text-[#3835A4] font-bold block">GUARANTEED COMPENSATION</span>
                            <span className="text-xs text-neutral-950 font-black font-mono tracking-wide">{casting.rate}</span>
                          </div>
                        </div>
                      </div>

                      {/* Outstanding tactile footer call-to-action */}
                      <div className="pt-6 mt-6 border-t border-dashed border-neutral-200 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#C6007E]" />
                          <span className="text-[8px] uppercase tracking-[0.2em] font-mono text-neutral-400 font-black">
                            ESCROW GUARANTEED
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-black uppercase text-neutral-500 group-hover:text-[#3835A4] transition-colors duration-300">
                            Apply Brief
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
