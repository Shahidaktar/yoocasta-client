import React, { useState } from 'react';
import { CastingCall } from '../types';
import { X, Calendar, MapPin, Sparkles, Send, FileCode, CheckCircle } from 'lucide-react';

interface CastingDetailsModalProps {
  casting: CastingCall;
  onClose: () => void;
}

export default function CastingDetailsModal({ casting, onClose }: CastingDetailsModalProps) {
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidateUrl, setCandidateUrl] = useState('');
  const [auditionVideoUrl, setAuditionVideoUrl] = useState('');
  const [isApplied, setIsApplied] = useState(false);

  // Parse days left
  const daysLeft = Math.ceil(
    (new Date(casting.expiryDate).getTime() - new Date('2026-06-23').getTime()) / (1000 * 3600 * 24)
  );
  
  const isExpired = daysLeft <= 0;

  const handleApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateEmail) return;

    setIsApplied(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-md">
      <div className="relative w-full max-w-3xl rounded-3xl border border-neutral-200 bg-white shadow-2xl overflow-y-auto md:overflow-hidden flex flex-col md:flex-row max-h-[92vh] md:h-[580px]">
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 rounded-full bg-white/80 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer border border-neutral-200 shadow-sm"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Visual Cover representation */}
        <div className="w-full md:w-[40%] bg-neutral-950 relative overflow-hidden h-44 md:h-full shrink-0">
          <img 
            src={casting.imageUrl} 
            alt={casting.title} 
            className="h-full w-full object-cover brightness-[0.7]" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-neutral-950/95 via-neutral-950/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <span className="p-1 px-2.5 rounded-full bg-amber-400 text-neutral-950 text-[9px] font-black uppercase tracking-wider">
              {casting.category}
            </span>
            <h2 className="font-display text-xl font-black text-white mt-2 leading-tight">
              {casting.title}
            </h2>
          </div>
        </div>

        {/* Right side Detailed Specifications */}
        <div className="w-full md:w-[60%] flex flex-col justify-between md:overflow-y-auto p-6 md:p-8">
          
          <div className="space-y-5">
            {/* Rates & Expiry Headers */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-4">
              <div>
                <p className="text-[10px] font-mono text-neutral-500 uppercase">Offered Budget</p>
                <p className="text-lg font-black text-amber-650 font-mono mt-0.5">{casting.rate}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono text-neutral-500 uppercase">Deadline</p>
                <p className="text-sm font-semibold text-neutral-900 font-mono mt-0.5">
                  {isExpired ? 'CLOSED' : `${daysLeft} Days Left`}
                </p>
              </div>
            </div>

            {/* Campaign description */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500">Campaign Overview</h3>
              <p className="mt-1.5 text-xs text-neutral-700 leading-relaxed">
                {casting.description}
              </p>
            </div>

            {/* Crucial specifications */}
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3.5">
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold">Role Criteria</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-neutral-500 font-mono">Target Genders</p>
                  <p className="text-xs font-bold text-neutral-900 mt-0.5">{casting.requirements.gender}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-neutral-500 font-mono">Playing Ages</p>
                  <p className="text-xs font-bold text-neutral-900 mt-0.5">{casting.requirements.ageRange}</p>
                </div>
              </div>

              {casting.requirements.languages && casting.requirements.languages.length > 0 && (
                <div className="border-t border-neutral-200 pt-2.5">
                  <p className="text-[9px] uppercase tracking-wider text-neutral-500 font-mono">Required Languages</p>
                  <p className="text-xs font-bold text-neutral-900 mt-0.5">{casting.requirements.languages.join(', ')}</p>
                </div>
              )}

              <div className="border-t border-neutral-200 pt-2.5">
                <p className="text-[9px] uppercase tracking-wider text-neutral-500 font-mono">Specific Instructions</p>
                <p className="text-xs text-neutral-700 mt-0.5 leading-relaxed">{casting.requirements.details}</p>
              </div>
            </div>

            {/* Logistics dates */}
            <div className="grid grid-cols-2 gap-2 text-xs text-neutral-600 font-mono">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-neutral-400" />
                <span>Shoot Date: <strong>{casting.shootDate}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 justify-end">
                <MapPin className="h-4 w-4 text-neutral-400" />
                <span>Shoot Location: <strong>UAE</strong></span>
              </div>
            </div>
          </div>

          {/* Interactive Audition Apply Panel */}
          <div className="mt-8 pt-5 border-t border-neutral-150">
            {isApplied ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-250 text-center flex flex-col items-center justify-center animate-fade-in">
                <CheckCircle className="h-6 w-6 text-emerald-650 mb-1.5" />
                <p className="text-sm font-bold text-emerald-800">Application Submitted!</p>
                <p className="text-[10px] text-neutral-505 mt-1 max-w-sm">The campaign director at {casting.client} received your digital comp card profile and has placed you on the queue.</p>
              </div>
            ) : (
              <form onSubmit={handleApplication} className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  <span>Submit Audition Now</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter Your Registered Email *"
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    className="rounded-lg bg-white border border-neutral-300 p-2.5 text-xs text-neutral-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                  />
                  <input
                    type="url"
                    placeholder="Portfolio URL or Instagram / Video link"
                    value={candidateUrl}
                    onChange={(e) => setCandidateUrl(e.target.value)}
                    className="rounded-lg bg-white border border-neutral-300 p-2.5 text-xs text-neutral-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                  />
                </div>

                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Paste 30-sec Audition tape Link (Dropbox, Youtube, Loom)..."
                    value={auditionVideoUrl}
                    onChange={(e) => setAuditionVideoUrl(e.target.value)}
                    className="flex-grow rounded-lg bg-white border border-neutral-300 p-2.5 text-xs text-neutral-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                  />
                  <button
                    type="submit"
                    className="bg-amber-500 text-white hover:bg-amber-600 font-bold px-5 rounded-lg text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 shadow-sm"
                  >
                    <Send className="h-3 w-3" />
                    <span>Apply Post</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
