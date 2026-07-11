import { useForm, Controller } from 'react-hook-form';
import { useAuthStore } from '../../../store/authStore';
import { FormOptions } from '../ProfileSetup';

interface Props {
  options: FormOptions;
  onSubmit: (data: any) => void;
  loading: boolean;
  existingProfile: any;
  isFirstTime: boolean;
}

const Step1BasicInfo = ({ options, onSubmit, loading, existingProfile, isFirstTime }: Props) => {
  const { user } = useAuthStore();
  const tp = existingProfile?.talentProfile;

  const { register, handleSubmit, watch, setValue, control, formState: { errors } } = useForm({
    defaultValues: {
      middleName: existingProfile?.middleName || '',
      whatsappNo: existingProfile?.whatsappNo || '',
      dob: tp?.dob ? new Date(tp.dob).toISOString().split('T')[0] : '',
      age: tp?.age?.toString() || '',
      gender: tp?.gender || '',
      nationalityId: existingProfile?.nationalityId || '',
      ethnicityId: tp?.ethnicityId || '',
      languageIds: tp?.languages?.map((l: any) => l.languageId) || [],
      dialectIds: tp?.dialects?.map((d: any) => d.dialectId) || [],
      cityId: tp?.cityId || '',
      countryId: tp?.city?.country?.id || '',
      address: tp?.address || '',
    }
  });

  const dob = watch('dob');
  const countryId = watch('countryId');

  const calculateAge = (dobValue: string) => {
    if (!dobValue) return '';
    const birthDate = new Date(dobValue);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age.toString();
  };

  const filteredCities = countryId
    ? options.cities.filter((c: any) => c.country?.id === countryId)
    : options.cities;

  const handleToggle = (id: string, current: string[], fieldName: 'languageIds' | 'dialectIds') => {
    const updated = current.includes(id) ? current.filter(item => item !== id) : [...current, id];
    setValue(fieldName, updated);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      
      {/* Structural Segment: Core Account Data */}
      <div className="space-y-6">
        <h3 className="text-xs font-black tracking-widest text-[#3835A4]/40 uppercase border-b border-[#3835A4]/10 pb-2">
          01 / Identity Parameters
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5 opacity-60">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 uppercase">First Name</label>
            <input value={user?.firstName || ''} disabled className="w-full bg-[#3835A4]/5 border-b-2 border-[#3835A4]/10 py-2.5 text-sm font-medium text-[#3835A4]/50 cursor-not-allowed outline-none" />
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 group-focus-within:text-[#3835A4] uppercase transition-colors duration-200">Middle Name</label>
            <input type="text" {...register('middleName')} placeholder="Optional" className="w-full bg-transparent border-b-2 border-[#3835A4]/10 focus:border-[#3835A4] py-2.5 text-sm font-medium text-[#3835A4] placeholder-[#3835A4]/20 outline-none transition-all duration-200" />
          </div>

          <div className="space-y-1.5 opacity-60">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 uppercase">Last Name</label>
            <input value={user?.lastName || ''} disabled className="w-full bg-[#3835A4]/5 border-b-2 border-[#3835A4]/10 py-2.5 text-sm font-medium text-[#3835A4]/50 cursor-not-allowed outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5 opacity-60">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 uppercase">Primary Email Node</label>
            <input value={user?.email || ''} disabled className="w-full bg-[#3835A4]/5 border-b-2 border-[#3835A4]/10 py-2.5 text-sm font-medium text-[#3835A4]/50 cursor-not-allowed outline-none" />
          </div>

          <div className="space-y-1.5 opacity-60">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 uppercase">Phone Link</label>
            <input value={user?.phone || 'Not Configured'} disabled className="w-full bg-[#3835A4]/5 border-b-2 border-[#3835A4]/10 py-2.5 text-sm font-medium text-[#3835A4]/50 cursor-not-allowed outline-none" />
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 group-focus-within:text-[#3835A4] uppercase transition-colors duration-200">WhatsApp Destination</label>
            <input type="text" {...register('whatsappNo')} placeholder="+971 00 000 0000" className="w-full bg-transparent border-b-2 border-[#3835A4]/10 focus:border-[#3835A4] py-2.5 text-sm font-medium text-[#3835A4] placeholder-[#3835A4]/20 outline-none transition-all duration-200" />
          </div>
        </div>
      </div>

      {/* Structural Segment: Profile Metrics */}
      <div className="space-y-6">
        <h3 className="text-xs font-black tracking-widest text-[#3835A4]/40 uppercase border-b border-[#3835A4]/10 pb-2">
          02 / Physical Metrics & Lineage
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-1.5 group">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 group-focus-within:text-[#3835A4] uppercase transition-colors duration-200">Date of Birth</label>
            <input
              type="date"
              {...register('dob')}
              onChange={(e) => {
                setValue('dob', e.target.value);
                setValue('age', calculateAge(e.target.value));
              }}
              className="w-full bg-transparent border-b-2 border-[#3835A4]/10 focus:border-[#3835A4] py-2 text-sm font-medium text-[#3835A4] outline-none transition-all duration-200"
            />
          </div>

          <div className="space-y-1.5 opacity-60">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 uppercase">Calculated Age</label>
            <input value={dob ? calculateAge(dob) : '—'} disabled className="w-full bg-[#3835A4]/5 border-b-2 border-[#3835A4]/10 py-2.5 text-sm font-bold text-[#3835A4] cursor-not-allowed outline-none" />
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 group-focus-within:text-[#3835A4] uppercase transition-colors duration-200">Gender Expression</label>
            <select {...register('gender', { required: 'Gender specification required' })} className="w-full bg-transparent border-b-2 border-[#3835A4]/10 focus:border-[#3835A4] py-2.5 text-sm font-medium text-[#3835A4] outline-none transition-all duration-200 cursor-pointer appearance-none">
              <option value="">Select Option</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-xs text-[#C6007E] font-semibold">{errors.gender.message as string}</p>}
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 group-focus-within:text-[#3835A4] uppercase transition-colors duration-200">Ethnicity Matrix</label>
            <select {...register('ethnicityId')} className="w-full bg-transparent border-b-2 border-[#3835A4]/10 focus:border-[#3835A4] py-2.5 text-sm font-medium text-[#3835A4] outline-none transition-all duration-200 cursor-pointer appearance-none">
              <option value="">Select Ethnicity</option>
              {options.ethnicities.map((e: any) => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Structural Segment: Linguistic Competencies */}
      <div className="space-y-6">
        <h3 className="text-xs font-black tracking-widest text-[#3835A4]/40 uppercase border-b border-[#3835A4]/10 pb-2">
          03 / Linguistic Grid
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 uppercase block">Languages Fluent</label>
            <Controller
              name="languageIds"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-2 max-h-[160px] overflow-y-auto p-3 bg-[#3835A4]/5 border border-[#3835A4]/10 rounded-xl">
                  {options.languages.map((l: any) => {
                    const isSelected = field.value?.includes(l.id);
                    return (
                      <button
                        type="button"
                        key={l.id}
                        onClick={() => handleToggle(l.id, field.value || [], 'languageIds')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 uppercase tracking-wider ${isSelected ? 'bg-[#3835A4] text-white shadow-sm' : 'bg-white border border-[#3835A4]/10 text-[#3835A4]/50 hover:border-[#3835A4]'}`}
                      >
                        {l.name}
                      </button>
                    );
                  })}
                </div>
              )}
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 uppercase block">Dialects Dialled</label>
            <Controller
              name="dialectIds"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-2 max-h-[160px] overflow-y-auto p-3 bg-[#3835A4]/5 border border-[#3835A4]/10 rounded-xl">
                  {options.dialects.map((d: any) => {
                    const isSelected = field.value?.includes(d.id);
                    return (
                      <button
                        type="button"
                        key={d.id}
                        onClick={() => handleToggle(d.id, field.value || [], 'dialectIds')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 uppercase tracking-wider ${isSelected ? 'bg-[#3835A4] text-white shadow-sm' : 'bg-white border border-[#3835A4]/10 text-[#3835A4]/50 hover:border-[#3835A4]'}`}
                      >
                        {d.name}
                      </button>
                    );
                  })}
                </div>
              )}
            />
          </div>
        </div>
      </div>

      {/* Structural Segment: Localization and Geography */}
      <div className="space-y-6">
        <h3 className="text-xs font-black tracking-widest text-[#3835A4]/40 uppercase border-b border-[#3835A4]/10 pb-2">
          04 / Localization Parameters
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5 group">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 group-focus-within:text-[#3835A4] uppercase transition-colors duration-200">Passport Sovereignty</label>
            <select {...register('nationalityId')} className="w-full bg-transparent border-b-2 border-[#3835A4]/10 focus:border-[#3835A4] py-2.5 text-sm font-medium text-[#3835A4] outline-none transition-all duration-200 cursor-pointer appearance-none">
              <option value="">Select Passport Nationality</option>
              {options.nationalities.map((n: any) => (
                <option key={n.id} value={n.id}>{n.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 group-focus-within:text-[#3835A4] uppercase transition-colors duration-200">Country of Residence</label>
            <select 
              {...register('countryId')} 
              onChange={(e) => {
                setValue('countryId', e.target.value);
                setValue('cityId', '');
              }}
              className="w-full bg-transparent border-b-2 border-[#3835A4]/10 focus:border-[#3835A4] py-2.5 text-sm font-medium text-[#3835A4] outline-none transition-all duration-200 cursor-pointer appearance-none"
            >
              <option value="">Select Country</option>
              {options.countries.map((c: any) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 group-focus-within:text-[#3835A4] uppercase transition-colors duration-200">Base Hub City</label>
            <select {...register('cityId')} className="w-full bg-transparent border-b-2 border-[#3835A4]/10 focus:border-[#3835A4] py-2.5 text-sm font-medium text-[#3835A4] outline-none transition-all duration-200 cursor-pointer appearance-none">
              <option value="">Select City</option>
              {filteredCities.map((c: any) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1.5 group">
          <label className="text-[10px] font-extrabold tracking-widest text-[#3835A4]/40 group-focus-within:text-[#3835A4] uppercase transition-colors duration-200">Physical Address Data</label>
          <textarea {...register('address')} rows={2} placeholder="Street, Building, Suite Coordinates..." className="w-full bg-transparent border-b-2 border-[#3835A4]/10 focus:border-[#3835A4] py-2.5 text-sm font-medium text-[#3835A4] placeholder-[#3835A4]/20 outline-none transition-all duration-200 resize-none" />
        </div>
      </div>

      {/* Persistent Operations Submission Frame */}
      <div className="pt-6 border-t border-[#3835A4]/10 flex items-center justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#3835A4] hover:bg-[#2a2780] disabled:bg-[#3835A4]/20 text-white disabled:text-white/40 font-black text-[10px] tracking-widest uppercase px-10 py-4 rounded-xl transition-all duration-200 active:scale-[0.99] disabled:pointer-events-none inline-flex items-center gap-3 shadow-lg shadow-[#3835A4]/20"
        >
          {loading ? 'Saving Data...' : isFirstTime ? 'Save & Progress →' : 'Commit Changes'}
        </button>
      </div>

    </form>
  );
};

export default Step1BasicInfo;