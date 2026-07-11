import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  onSubmit: (file: File) => void;
  onBack: () => void;
  loading: boolean;
  existingProfile: any;
  isFirstTime: boolean;
}

const Step5Photo = ({ onSubmit, onBack, loading, existingProfile, isFirstTime }: Props) => {
  const [preview, setPreview] = useState<string | null>(existingProfile?.image || null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(selected.type)) {
      setError('Only JPEG, PNG, and WebP assets are authorized.');
      return;
    }
    if (selected.size > 5 * 1024 * 1024) {
      setError('Asset footprint exceeds maximum threshold of 5MB.');
      return;
    }

    setError('');
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  return (
    <div className="space-y-12">
      
      {/* Structural Segment: Asset Rules & Parameters */}
      <div className="space-y-6">
        <h3 className="text-xs font-black tracking-widest text-[#3835A4]/40 uppercase border-b border-[#3835A4]/10 pb-2">
          01 / Visual Identity Criteria
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#3835A4]/5 border border-[#3835A4]/10 rounded-2xl p-6">
          <div className="space-y-1">
            <h4 className="text-[10px] font-extrabold tracking-widest text-[#3835A4] uppercase">Composition</h4>
            <p className="text-xs text-[#3835A4]/60 leading-relaxed">Clear, un-obstructed headshot. Neutral, premium illumination with minimal post-processing artifacts.</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-[10px] font-extrabold tracking-widest text-[#3835A4] uppercase">Topology</h4>
            <p className="text-xs text-[#3835A4]/60 leading-relaxed">Clean or minimalist contextual backdrop. Retain raw profile authenticity.</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-[10px] font-extrabold tracking-widest text-[#3835A4] uppercase">Dimensions</h4>
            <p className="text-xs text-[#3835A4]/60 leading-relaxed">JPEG, PNG, or WebP wrappers. Max allocation 5MB. Target minimum pixel array of 400×400.</p>
          </div>
        </div>
      </div>

      {/* Structural Segment: Interactive Media Drop Frame */}
      <div className="space-y-6">
        <h3 className="text-xs font-black tracking-widest text-[#3835A4]/40 uppercase border-b border-[#3835A4]/10 pb-2">
          02 / Portrait Asset Ingestion
        </h3>

        {error && (
          <p className="text-xs font-bold text-[#C6007E] uppercase tracking-wide bg-[#C6007E]/5 border border-[#C6007E]/20 px-4 py-3 rounded-xl">
            ⚠️ {error}
          </p>
        )}

        <div className="flex flex-col items-center justify-center">
          <div
            onClick={() => inputRef.current?.click()}
            className="group relative w-full max-w-md aspect-square bg-[#3835A4]/5 border-2 border-dashed border-[#3835A4]/20 hover:border-[#3835A4] rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-300"
          >
            {preview ? (
              <>
                <img 
                  src={preview} 
                  alt="Identity Profile Preview" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" 
                />
                <div className="absolute inset-0 bg-[#3835A4]/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 backdrop-blur-[2px]">
                  <span className="text-[10px] font-black tracking-widest text-white uppercase bg-[#3835A4]/80 px-4 py-2.5 rounded-lg border border-white/10">
                    Replace Asset Frame
                  </span>
                </div>
              </>
            ) : (
              <div className="space-y-2 p-8 text-center transition-transform duration-200 group-hover:scale-[0.99]">
                <div className="w-12 h-12 rounded-full bg-[#3835A4]/10 flex items-center justify-center mx-auto text-[#3835A4]/40 group-hover:text-[#3835A4] group-hover:bg-[#3835A4]/20 transition-colors duration-200 text-lg font-light">
                  +
                </div>
                <p className="text-xs font-bold text-[#3835A4] uppercase tracking-wider">
                  Ingest Portrait Asset
                </p>
                <p className="text-[10px] text-[#3835A4]/40 font-medium tracking-wide">
                  Click to access systemic storage framework
                </p>
              </div>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {preview && (
            <button 
              type="button" 
              onClick={() => { setPreview(null); setFile(null); }} 
              className="mt-4 text-[10px] font-black uppercase tracking-widest text-[#3835A4]/40 hover:text-[#C6007E] transition-colors duration-150"
            >
              Purge Asset Frame
            </button>
          )}
        </div>
      </div>

      {/* Persistent Control Hub Structure */}
      <div className="pt-6 border-t border-[#3835A4]/10 flex items-center justify-between gap-4">
        <button 
          type="button" 
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#3835A4]/40 hover:text-[#3835A4] transition-colors duration-200 py-3"
        >
          <span className="transition-transform group-hover:-translate-x-1 duration-150">←</span> 
          Back
        </button>

        <div className="flex items-center gap-3">
          {existingProfile?.image && !file && (
            <button
              type="button"
              onClick={() => navigate(isFirstTime ? '/dashboard/talent' : '/dashboard/talent/profile')}
              className="border border-[#3835A4]/20 hover:border-[#3835A4] text-[#3835A4]/50 hover:text-[#3835A4] font-black text-[10px] tracking-widest uppercase px-6 py-4 rounded-xl transition-all duration-200 active:scale-[0.99]"
            >
              {isFirstTime ? 'Retain Frame & Finalize' : 'Retain Current Frame'}
            </button>
          )}
          
          <button
            type="button"
            onClick={() => file && onSubmit(file)}
            disabled={loading || !file}
            className="bg-[#3835A4] hover:bg-[#2a2780] disabled:bg-[#3835A4]/20 text-white disabled:text-white/40 font-black text-[10px] tracking-widest uppercase px-10 py-4 rounded-xl transition-all duration-200 active:scale-[0.99] disabled:pointer-events-none inline-flex items-center gap-3 shadow-lg shadow-[#3835A4]/20"
          >
            {loading ? 'Committing Binary Data...' : isFirstTime ? 'Finalize Registration ↗' : 'Commit Asset Changes'}
          </button>
        </div>
      </div>

    </div>
  );
};

export default Step5Photo;