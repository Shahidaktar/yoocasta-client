import React, { useState } from 'react';
import { CastingCall } from '../types';
import { X, Calendar, Globe, Award, Sparkles, Building2 } from 'lucide-react';

interface CastingWizardProps {
  onClose: () => void;
  onSubmit: (newCasting: CastingCall) => void;
}

export default function CastingWizard({ onClose, onSubmit }: CastingWizardProps) {
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [category, setCategory] = useState('Models');
  const [description, setDescription] = useState('');
  
  // Requirements
  const [gender, setGender] = useState<'Male' | 'Female' | 'All' | 'Non-binary'>('All');
  const [ageRange, setAgeRange] = useState('18 - 35 years old');
  const [languages, setLanguages] = useState('Arabic, English');
  const [details, setDetails] = useState('');

  // Location & budget
  const [location, setLocation] = useState('Dubai, UAE');
  const [paymentType, setPaymentType] = useState<'Paid' | 'Unpaid'>('Paid');
  const [rate, setRate] = useState('AED 2,500 / Day');
  const [imageUrl, setImageUrl] = useState('');

  const availableCategories = [
    'Actors & Extras', 'Singers', 'Dancers', 'Models', 'Photographers', 
    'Directors & Crew', 'Promoters & Hosts', 'Makeup & Hair Artists', 'Voice Over Artists'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !client.trim() || !description.trim()) return;

    // Use default premium campaign cover if empty
    const img = imageUrl.trim() || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=850';

    const newCasting: CastingCall = {
      id: `c-custom-${Date.now()}`,
      title,
      client,
      category,
      description,
      requirements: {
        gender,
        ageRange,
        languages: languages.split(',').map(l => l.trim()),
        details: details || 'Must be highly professional, ready for multi-pose studio lighting shoots.',
      },
      location,
      paymentType: paymentType as any,
      rate,
      expiryDate: '2026-07-20',
      shootDate: '2026-07-29',
      imageUrl: img,
      status: 'Open',
    };

    onSubmit(newCasting);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-3xl border border-neutral-200 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-100 bg-neutral-50">
          <div className="flex items-center gap-2">
            <span className="p-1 px-2.5 rounded-md bg-amber-400 text-neutral-950 text-[10px] font-black uppercase tracking-wider">DIRECTOR BRIEF</span>
            <h2 className="font-display text-lg font-bold text-neutral-900">Publish Casting Call</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-grow p-6 overflow-y-auto space-y-5 bg-white shrink-0">
          
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-amber-700 shrink-0" />
            <span className="text-xs text-neutral-700">
              Your campaign brief will be shown immediately to thousands of active talents in the Middle East. Eligible applicants will receive direct alerts.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-bold">Company / Client Brand *</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3.5 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Careem, Emaar, Nike"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full rounded-xl bg-white border border-neutral-300 p-3 pl-10 text-sm text-neutral-800 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-bold">Project / Casting Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Females for Luxury Cosmetics Video"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl bg-white border border-neutral-300 p-3 text-sm text-neutral-800 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-bold">Target Talent Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl bg-white border border-neutral-300 p-3 text-sm text-neutral-700 focus:outline-none focus:border-amber-500"
              >
                {availableCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-amber-700 mb-1.5 font-bold">Budget Rate *</label>
              <input
                type="text"
                required
                placeholder="e.g. AED 3,000 / Day or AED 5,000 Flat"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full rounded-xl bg-white border border-neutral-300 p-3 text-sm text-neutral-800 focus:outline-none focus:border-amber-500 font-mono font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-bold">Target Location *</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl bg-white border border-neutral-300 p-3 text-sm text-neutral-700 focus:outline-none focus:border-amber-500"
              >
                <option value="Dubai, UAE">Dubai, UAE</option>
                <option value="Sharjah, UAE">Sharjah, UAE</option>
                <option value="Abu Dhabi, UAE">Abu Dhabi, UAE</option>
                <option value="Riyadh, Saudi Arabia">Riyadh, Saudi Arabia</option>
                <option value="Jeddah, Saudi Arabia">Jeddah, Saudi Arabia</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-bold">Cover Thumbnail URL</label>
              <input
                type="url"
                placeholder="e.g. https://images.unsplash.com/your-theme"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full rounded-xl bg-white border border-neutral-300 p-3 text-sm text-neutral-805 focus:outline-none focus:border-amber-500"
              />
              <span className="text-[10px] text-neutral-500 mt-1 block">Leave empty for beautiful studio camera set placeholder.</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-bold">Detailed Project Brief Description *</label>
            <textarea
              required
              rows={3}
              placeholder="Provide a compelling description of the shoot, role, expected exposure, wardrobe briefs, and dates..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl bg-white border border-neutral-300 p-3 text-sm text-neutral-800 focus:outline-none focus:border-amber-500 placeholder-neutral-400 leading-relaxed"
            />
          </div>

          <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-800 font-bold">Physical & Accent Requirements</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1 font-semibold">Gender Restriction</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full rounded-lg bg-white border border-neutral-300 p-2 text-xs text-neutral-700 focus:outline-none focus:border-amber-500"
                >
                  <option value="All">No Limits (All Genders)</option>
                  <option value="Female">Female Only</option>
                  <option value="Male">Male Only</option>
                  <option value="Non-binary">Non-binary Only</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1 font-semibold">Playing Age</label>
                <input
                  type="text"
                  placeholder="e.g. 18 - 32 years"
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.target.value)}
                  className="w-full rounded-lg bg-white border border-neutral-300 p-2 text-xs text-neutral-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1 font-semibold">Spoken Dialects</label>
                <input
                  type="text"
                  placeholder="e.g. Gulf Arabic, French"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  className="w-full rounded-lg bg-white border border-neutral-300 p-2 text-xs text-neutral-800 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1 font-semibold">Audition Materials Needed / Specific Instructions</label>
              <input
                type="text"
                placeholder="e.g. Please record and submit a 30-second hello video clip with side-view angles"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full rounded-lg bg-white border border-neutral-300 p-2 text-xs text-neutral-800 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full rounded-xl bg-amber-500 py-3 text-xs font-black text-white hover:bg-amber-600 transition-all shadow-md text-center uppercase tracking-wider cursor-pointer"
          >
            Launch Casting Call Board
          </button>
        </form>

      </div>
    </div>
  );
}
