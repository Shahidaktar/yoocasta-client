import React, { useState } from 'react';
import { Talent } from '../types';
import { X, User, Sliders, Award, Image as ImageIcon, Sparkles } from 'lucide-react';

interface TalentWizardProps {
  onClose: () => void;
  onSubmit: (newTalent: Talent) => void;
}

export default function TalentWizard({ onClose, onSubmit }: TalentWizardProps) {
  const [step, setStep] = useState(1);
  
  // Basic Details State
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Non-binary'>('Female');
  const [selectedCats, setSelectedCats] = useState<string[]>(['Models']);
  const [location, setLocation] = useState('Dubai, UAE');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('');
  
  // Stats details states
  const [height, setHeight] = useState(175);
  const [chest, setChest] = useState(90);
  const [waist, setWaist] = useState(60);
  const [hips, setHips] = useState(90);
  const [shoeSize, setShoeSize] = useState(38);
  const [eyeColor, setEyeColor] = useState('Brown');
  const [hairColor, setHairColor] = useState('Black');

  // Experience states
  const [experienceText, setExperienceText] = useState('');

  const availableCategories = [
    'Actors & Extras', 'Singers', 'Dancers', 'Models', 
    'Photographers', 'Directors & Crew', 'Promoters & Hosts', 
    'Makeup & Hair Artists', 'Voice Over Artists'
  ];

  const toggleCategory = (cat: string) => {
    if (selectedCats.includes(cat)) {
      setSelectedCats(selectedCats.filter(c => c !== cat));
    } else {
      setSelectedCats([...selectedCats, cat]);
    }
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const experiences = experienceText
      ? experienceText.split('\n').filter(line => line.trim() !== '')
      : ['Boutique fashion photoshoot participant', 'Middle-East digital advertising extra'];

    // Provide default image if empty
    const imgUrl = profileImage.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800';

    const newTalent: Talent = {
      id: `t-custom-${Date.now()}`,
      name,
      gender,
      categories: selectedCats,
      location,
      profileImage: imgUrl,
      galleryImages: [imgUrl],
      bio: bio.trim() || 'Active lifestyle enthusiast interested in top brand campaigns and casting collaborations.',
      isPremium: true, // All newly created ones are premium for testing
      stats: {
        height,
        chestOrBust: chest,
        waist,
        hips,
        shoeSize,
        eyeColor,
        hairColor,
      },
      experience: experiences,
    };

    onSubmit(newTalent);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-3xl border border-neutral-200 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-100 bg-neutral-50">
          <div className="flex items-center gap-2">
            <span className="p-1 px-2.5 rounded-md bg-amber-400 text-neutral-950 text-[10px] font-black uppercase tracking-wider">NEW COM CARD</span>
            <h2 className="font-display text-lg font-bold text-neutral-900">Create Talent Portfolio</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Wizard Navigation Progress Indicators */}
        <div className="bg-neutral-50/50 py-3.5 px-6 border-b border-neutral-100 flex items-center justify-between text-xs text-neutral-600 font-mono">
          <div className="flex items-center gap-6">
            <span className={`flex items-center gap-1.5 ${step === 1 ? 'text-amber-700 font-bold' : ''}`}>
              <User className="h-3.5 w-3.5" /> 1. Basics
            </span>
            <span className={`flex items-center gap-1.5 ${step === 2 ? 'text-amber-700 font-bold' : ''}`}>
              <Sliders className="h-3.5 w-3.5" /> 2. Physical
            </span>
            <span className={`flex items-center gap-1.5 ${step === 3 ? 'text-amber-700 font-bold' : ''}`}>
              <Award className="h-3.5 w-3.5" /> 3. Milestones & Submit
            </span>
          </div>
          <span>Step {step}/3</span>
        </div>

        <form onSubmit={handleSubmit} className="flex-grow p-6 overflow-y-auto space-y-6 bg-white shrink-0">
          
          {/* STEP 1: BASIC DETAILS */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-bold">Talent Stage Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Archana Roy"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl bg-white border border-neutral-300 p-3 text-sm text-neutral-805 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-bold">Gender *</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full rounded-xl bg-white border border-neutral-300 p-3 text-sm text-neutral-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Non-binary">Non-binary</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-amber-700 mb-1.5 font-bold">Primary Categories</label>
                <div className="flex flex-wrap gap-2">
                  {availableCategories.map((cat) => {
                    const isSelected = selectedCats.includes(cat);
                    return (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer border transition-all ${
                          isSelected
                            ? 'bg-amber-500 text-white border-amber-500 font-bold'
                            : 'bg-white text-neutral-600 border-neutral-250 hover:bg-neutral-50 hover:text-neutral-900'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-bold">Location *</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-xl bg-white border border-neutral-300 p-3 text-sm text-neutral-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                  >
                    <option value="Dubai, UAE">Dubai, UAE</option>
                    <option value="Sharjah, UAE">Sharjah, UAE</option>
                    <option value="Abu Dhabi, UAE">Abu Dhabi, UAE</option>
                    <option value="Riyadh, Saudi Arabia">Riyadh, Saudi Arabia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-bold">Profile Image URL</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/your-photo"
                    value={profileImage}
                    onChange={(e) => setProfileImage(e.target.value)}
                    className="w-full rounded-xl bg-white border border-neutral-300 p-3 text-sm text-neutral-805 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                  />
                  <span className="text-[10px] text-neutral-500 mt-1 block">Leave blank for premium AI headshot fallback.</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-bold">Introductory Bio / Headline</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Energetic model & runner eager to represent Middle East luxury watch and car brands..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full rounded-xl bg-white border border-neutral-300 p-3 text-sm text-neutral-808 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 placeholder-neutral-400"
                />
              </div>
            </div>
          )}

          {/* STEP 2: PHYSICAL SPECIFICATIONS */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-amber-700 shrink-0" />
                <span className="text-xs text-neutral-700">
                  Accurate stats help casting agents filter profiles instantly. Ensure your heights and measurements are close to reality.
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                    className="w-full rounded-xl bg-white border border-neutral-300 p-2.5 text-sm font-mono text-center text-neutral-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1">Bust/Chest (cm)</label>
                  <input
                    type="number"
                    value={chest}
                    onChange={(e) => setChest(parseInt(e.target.value) || 0)}
                    className="w-full rounded-xl bg-white border border-neutral-300 p-2.5 text-sm font-mono text-center text-neutral-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1">Waist (cm)</label>
                  <input
                    type="number"
                    value={waist}
                    onChange={(e) => setWaist(parseInt(e.target.value) || 0)}
                    className="w-full rounded-xl bg-white border border-neutral-300 p-2.5 text-sm font-mono text-center text-neutral-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1">Hips (cm)</label>
                  <input
                    type="number"
                    value={hips}
                    onChange={(e) => setHips(parseInt(e.target.value) || 0)}
                    className="w-full rounded-xl bg-white border border-neutral-300 p-2.5 text-sm font-mono text-center text-neutral-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1">Shoe Size (EU)</label>
                  <input
                    type="number"
                    value={shoeSize}
                    onChange={(e) => setShoeSize(parseInt(e.target.value) || 0)}
                    className="w-full rounded-xl bg-white border border-neutral-300 p-2.5 text-sm font-mono text-center text-neutral-850 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1">Eye Color</label>
                  <select
                    value={eyeColor}
                    onChange={(e) => setEyeColor(e.target.value)}
                    className="w-full rounded-xl bg-white border border-neutral-300 p-3 text-sm text-neutral-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                  >
                    <option value="Brown">Dark Brown / Black</option>
                    <option value="Hazel">Hazel</option>
                    <option value="Green">Green</option>
                    <option value="Blue">Blue</option>
                    <option value="Amber">Amber</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1">Hair Color</label>
                  <select
                    value={hairColor}
                    onChange={(e) => setHairColor(e.target.value)}
                    className="w-full rounded-xl bg-white border border-neutral-300 p-3 text-sm text-neutral-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                  >
                    <option value="Black">Natural Black</option>
                    <option value="Brown">Dark Brown</option>
                    <option value="Auburn">Auburn / Red</option>
                    <option value="Blonde">Blonde</option>
                    <option value="Silver">Dyed / Silver</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: EXPERIENCE TIMELINE */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-2 font-bold">Past Achievements (One per line)</label>
                <textarea
                  rows={4}
                  placeholder="e.g. Lead Extra: Emirates National Day Commercial 2025&#10;Model: Dubai Fashion Week Boutique Runway Show 2024&#10;Model: Sephora Middle-East Social Media Product Demo"
                  value={experienceText}
                  onChange={(e) => setExperienceText(e.target.value)}
                  className="w-full rounded-xl bg-white border border-neutral-300 p-3 text-xs font-mono text-neutral-808 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 placeholder-neutral-400 leading-relaxed"
                />
                <span className="text-[10px] text-neutral-500 mt-1 block">Specify your past shoot dates or commercial titles to enhance your score.</span>
              </div>

              {/* Verified Consent Check */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex items-start gap-3">
                <input
                  type="checkbox"
                  required
                  id="consent_check"
                  className="mt-1 accent-amber-500"
                />
                <label htmlFor="consent_check" className="text-xs text-neutral-600 leading-relaxed font-sans">
                  I agree that my physical statistics can be cataloged on Yoocasta Middle East database and shared with verified directors, design firms, and advertising companies in Dubai, Riyadh, and Abu Dhabi.
                </label>
              </div>
            </div>
          )}
        </form>

        {/* Modal Bottom footer triggers progress */}
        <div className="p-6 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={step === 1}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              step === 1 ? 'opacity-30 cursor-not-allowed text-neutral-400 bg-neutral-100' : 'bg-white text-neutral-800 border border-neutral-300 hover:bg-neutral-50 shadow-sm'
            }`}
          >
            Back
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-5 py-2 text-xs font-bold rounded-lg bg-white border border-neutral-300 text-amber-705 hover:bg-neutral-50 transition-all cursor-pointer shadow-sm"
            >
              Next Step
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 text-xs font-black rounded-lg bg-amber-500 text-white hover:bg-amber-600 hover:scale-[1.01] transition-all shadow-md cursor-pointer"
            >
              Publish Composite Card
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
