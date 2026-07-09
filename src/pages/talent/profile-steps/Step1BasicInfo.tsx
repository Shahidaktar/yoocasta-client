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

  const { register, handleSubmit, watch, setValue, control } = useForm({
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

  // Auto calculate age
  const calculateAge = (dobValue: string) => {
    if (!dobValue) return '';
    const birthDate = new Date(dobValue);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age.toString();
  };

  // Filter cities by country
  const filteredCities = countryId
    ? options.cities.filter((c: any) => c.country?.id === countryId)
    : options.cities;

  const handleLanguageToggle = (id: string, current: string[]) => {
    const updated = current.includes(id)
      ? current.filter(l => l !== id)
      : [...current, id];
    setValue('languageIds', updated);
    return updated;
  };

  const handleDialectToggle = (id: string, current: string[]) => {
    const updated = current.includes(id)
      ? current.filter(d => d !== id)
      : [...current, id];
    setValue('dialectIds', updated);
    return updated;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Step 1 — Basic Info</h2>

      {/* Auto-filled fields */}
      <div>
        <label>First Name</label>
        <input value={user?.firstName || ''} disabled style={{ background: '#f5f5f5' }} />
      </div>
      <div>
        <label>Middle Name</label>
        <input {...register('middleName')} />
      </div>
      <div>
        <label>Last Name</label>
        <input value={user?.lastName || ''} disabled style={{ background: '#f5f5f5' }} />
      </div>
      <div>
        <label>Email</label>
        <input value={user?.email || ''} disabled style={{ background: '#f5f5f5' }} />
      </div>
      <div>
        <label>Phone</label>
        <input value={''} disabled style={{ background: '#f5f5f5' }} />
      </div>
      <div>
        <label>WhatsApp Number</label>
        <input {...register('whatsappNo')} placeholder="+971xxxxxxxxx" />
      </div>

      {/* DOB + Age */}
      <div>
        <label>Date of Birth</label>
        <input
          type="date"
          {...register('dob')}
          onChange={(e) => {
            setValue('dob', e.target.value);
            setValue('age', calculateAge(e.target.value));
          }}
        />
      </div>
      <div>
        <label>Age (auto-calculated)</label>
        <input value={dob ? calculateAge(dob) : ''} disabled style={{ background: '#f5f5f5' }} />
      </div>

      {/* Gender */}
      <div>
        <label>Gender</label>
        <select {...register('gender', { required: 'Gender is required' })}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {/* {errors.gender && <p style={{ color: 'red' }}>{errors.gender.message as string}</p>} */}
      </div>

      {/* Nationality */}
      <div>
        <label>Nationality</label>
        <select {...register('nationalityId')}>
          <option value="">Select Nationality</option>
          {options.nationalities.map((n: any) => (
            <option key={n.id} value={n.id}>{n.name}</option>
          ))}
        </select>
      </div>

      {/* Ethnicity */}
      <div>
        <label>Ethnicity</label>
        <select {...register('ethnicityId')}>
          <option value="">Select Ethnicity</option>
          {options.ethnicities.map((e: any) => (
            <option key={e.id} value={e.id}>{e.name}</option>
          ))}
        </select>
      </div>

      {/* Languages */}
      <div>
        <label>Languages Spoken</label>
        <Controller
          name="languageIds"
          control={control}
          render={({ field }) => (
            <select
              multiple
              value={field.value}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, o => o.value);
                field.onChange(selected);
              }}
              style={{ height: '120px', width: '100%' }}
            >
              {options.languages.map((l: any) => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          )}
        />
        <small>Hold Ctrl/Cmd to select multiple</small>
      </div>

      {/* Dialects */}
      <div>
        <label>Dialects Spoken</label>
        <Controller
          name="dialectIds"
          control={control}
          render={({ field }) => (
            <select
              multiple
              value={field.value}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, o => o.value);
                field.onChange(selected);
              }}
              style={{ height: '120px', width: '100%' }}
            >
              {options.dialects.map((d: any) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          )}
        />
        <small>Hold Ctrl/Cmd to select multiple</small>
      </div>

      {/* Country */}
      <div>
        <label>Country</label>
        <select {...register('countryId')} onChange={(e) => {
          setValue('countryId', e.target.value);
          setValue('cityId', '');
        }}>
          <option value="">Select Country</option>
          {options.countries.map((c: any) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* City */}
      <div>
        <label>City</label>
        <select {...register('cityId')}>
          <option value="">Select City</option>
          {filteredCities.map((c: any) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Address */}
      <div>
        <label>Address</label>
        <textarea {...register('address')} rows={3} />
      </div>

      <button type="submit" disabled={loading}>
  {loading ? 'Saving...' : isFirstTime ? 'Save & Next →' : 'Save Changes'}
</button>
    </form>
  );
};

export default Step1BasicInfo;