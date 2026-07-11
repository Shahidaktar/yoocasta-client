import { useForm } from 'react-hook-form';

interface Props {
  onSubmit: (data: any) => void;
  onBack: () => void;
  loading: boolean;
  existingProfile: any;
  isFirstTime: boolean;
}

const Step2Physical = ({ onSubmit, onBack, loading, existingProfile, isFirstTime }: Props) => {
  const tp = existingProfile?.talentProfile;

  const { register, handleSubmit } = useForm({
    defaultValues: {
      height: tp?.height || '',
      weight: tp?.weight || '',
      hairColor: tp?.hairColor || '',
      hairType: tp?.hairType || '',
      hairLength: tp?.hairLength || '',
      eyeColor: tp?.eyeColor || '',
      chest: tp?.chest || '',
      waist: tp?.waist || '',
      shoeSize: tp?.shoeSize || '',
      bodyStructure: tp?.bodyStructure || '',
      tattoo: tp?.tattoo || '',
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      
      {/* Structural Segment: Core Physical Framework */}
      <div className="space-y-6">
        <h3 className="text-xs font-black tracking-widest text-[#3835A4]/40 uppercase border-b border-[#3835A4]/10 pb-2">
          01 / Frame & Proportions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5 group">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 group-focus-within:text-[#3835A4] uppercase transition-colors duration-200">
              Height (cm)
            </label>
            <input 
              type="number" 
              {...register('height')} 
              placeholder="e.g. 175" 
              className="w-full bg-transparent border-b-2 border-[#3835A4]/10 focus:border-[#3835A4] py-2.5 text-sm font-medium text-[#3835A4] placeholder-[#3835A4]/20 outline-none transition-all duration-200" 
            />
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 group-focus-within:text-[#3835A4] uppercase transition-colors duration-200">
              Weight (kg)
            </label>
            <input 
              type="number" 
              {...register('weight')} 
              placeholder="e.g. 70" 
              className="w-full bg-transparent border-b-2 border-[#3835A4]/10 focus:border-[#3835A4] py-2.5 text-sm font-medium text-[#3835A4] placeholder-[#3835A4]/20 outline-none transition-all duration-200" 
            />
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 group-focus-within:text-[#3835A4] uppercase transition-colors duration-200">
              Body Structure
            </label>
            <select 
              {...register('bodyStructure')} 
              className="w-full bg-transparent border-b-2 border-[#3835A4]/10 focus:border-[#3835A4] py-2.5 text-sm font-medium text-[#3835A4] outline-none transition-all duration-200 cursor-pointer appearance-none"
            >
              <option value="">Select Build</option>
              {['Slim', 'Athletic', 'Average', 'Heavy', 'Muscular'].map(b => (
                <option key={b} value={b.toLowerCase()}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-1.5 group">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 group-focus-within:text-[#3835A4] uppercase transition-colors duration-200">
              Chest (cm)
            </label>
            <input 
              type="number" 
              {...register('chest')} 
              placeholder="e.g. 90" 
              className="w-full bg-transparent border-b-2 border-[#3835A4]/10 focus:border-[#3835A4] py-2.5 text-sm font-medium text-[#3835A4] placeholder-[#3835A4]/20 outline-none transition-all duration-200" 
            />
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 group-focus-within:text-[#3835A4] uppercase transition-colors duration-200">
              Waist (cm)
            </label>
            <input 
              type="number" 
              {...register('waist')} 
              placeholder="e.g. 75" 
              className="w-full bg-transparent border-b-2 border-[#3835A4]/10 focus:border-[#3835A4] py-2.5 text-sm font-medium text-[#3835A4] placeholder-[#3835A4]/20 outline-none transition-all duration-200" 
            />
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 group-focus-within:text-[#3835A4] uppercase transition-colors duration-200">
              Shoe Size (EU)
            </label>
            <input 
              type="number" 
              {...register('shoeSize')} 
              placeholder="e.g. 42" 
              className="w-full bg-transparent border-b-2 border-[#3835A4]/10 focus:border-[#3835A4] py-2.5 text-sm font-medium text-[#3835A4] placeholder-[#3835A4]/20 outline-none transition-all duration-200" 
            />
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 group-focus-within:text-[#3835A4] uppercase transition-colors duration-200">
              Dermal Artwork / Tattoo
            </label>
            <select 
              {...register('tattoo')} 
              className="w-full bg-transparent border-b-2 border-[#3835A4]/10 focus:border-[#3835A4] py-2.5 text-sm font-medium text-[#3835A4] outline-none transition-all duration-200 cursor-pointer appearance-none"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      </div>

      {/* Structural Segment: Aesthetic Features */}
      <div className="space-y-6">
        <h3 className="text-xs font-black tracking-widest text-[#3835A4]/40 uppercase border-b border-[#3835A4]/10 pb-2">
          02 / Hair & Ocular Metrics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-1.5 group">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 group-focus-within:text-[#3835A4] uppercase transition-colors duration-200">
              Hair Color
            </label>
            <select 
              {...register('hairColor')} 
              className="w-full bg-transparent border-b-2 border-[#3835A4]/10 focus:border-[#3835A4] py-2.5 text-sm font-medium text-[#3835A4] outline-none transition-all duration-200 cursor-pointer appearance-none"
            >
              <option value="">Select Color</option>
              {['Black', 'Brown', 'Blonde', 'Red', 'Grey', 'White', 'Other'].map(c => (
                <option key={c} value={c.toLowerCase()}>{c}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 group-focus-within:text-[#3835A4] uppercase transition-colors duration-200">
              Hair Type
            </label>
            <select 
              {...register('hairType')} 
              className="w-full bg-transparent border-b-2 border-[#3835A4]/10 focus:border-[#3835A4] py-2.5 text-sm font-medium text-[#3835A4] outline-none transition-all duration-200 cursor-pointer appearance-none"
            >
              <option value="">Select Type</option>
              {['Straight', 'Wavy', 'Curly', 'Coily', 'Bald'].map(t => (
                <option key={t} value={t.toLowerCase()}>{t}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 group-focus-within:text-[#3835A4] uppercase transition-colors duration-200">
              Hair Length
            </label>
            <select 
              {...register('hairLength')} 
              className="w-full bg-transparent border-b-2 border-[#3835A4]/10 focus:border-[#3835A4] py-2.5 text-sm font-medium text-[#3835A4] outline-none transition-all duration-200 cursor-pointer appearance-none"
            >
              <option value="">Select Length</option>
              {['Short', 'Medium', 'Long', 'Very Long', 'Bald'].map(l => (
                <option key={l} value={l.toLowerCase()}>{l}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 group-focus-within:text-[#3835A4] uppercase transition-colors duration-200">
              Eye Color
            </label>
            <select 
              {...register('eyeColor')} 
              className="w-full bg-transparent border-b-2 border-[#3835A4]/10 focus:border-[#3835A4] py-2.5 text-sm font-medium text-[#3835A4] outline-none transition-all duration-200 cursor-pointer appearance-none"
            >
              <option value="">Select Iris Color</option>
              {['Brown', 'Black', 'Blue', 'Green', 'Grey', 'Hazel', 'Other'].map(c => (
                <option key={c} value={c.toLowerCase()}>{c}</option>
              ))}
            </select>
          </div>
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

        <button
          type="submit"
          disabled={loading}
          className="bg-[#3835A4] hover:bg-[#2a2780] disabled:bg-[#3835A4]/20 text-white disabled:text-white/40 font-black text-[10px] tracking-widest uppercase px-10 py-4 rounded-xl transition-all duration-200 active:scale-[0.99] disabled:pointer-events-none inline-flex items-center gap-3 shadow-lg shadow-[#3835A4]/20"
        >
          {loading ? 'Preserving Matrix...' : isFirstTime ? 'Save & Progress →' : 'Commit Changes'}
        </button>
      </div>

    </form>
  );
};

export default Step2Physical;