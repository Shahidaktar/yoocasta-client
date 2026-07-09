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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Step 2 — Physical Attributes</h2>

      <div>
        <label>Height (cm)</label>
        <input {...register('height')} placeholder="e.g. 175" />
      </div>
      <div>
        <label>Weight (kg)</label>
        <input {...register('weight')} placeholder="e.g. 70" />
      </div>
      <div>
        <label>Hair Color</label>
        <select {...register('hairColor')}>
          <option value="">Select</option>
          {['Black', 'Brown', 'Blonde', 'Red', 'Grey', 'White', 'Other'].map(c => (
            <option key={c} value={c.toLowerCase()}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Hair Type</label>
        <select {...register('hairType')}>
          <option value="">Select</option>
          {['Straight', 'Wavy', 'Curly', 'Coily', 'Bald'].map(t => (
            <option key={t} value={t.toLowerCase()}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Hair Length</label>
        <select {...register('hairLength')}>
          <option value="">Select</option>
          {['Short', 'Medium', 'Long', 'Very Long', 'Bald'].map(l => (
            <option key={l} value={l.toLowerCase()}>{l}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Eye Color</label>
        <select {...register('eyeColor')}>
          <option value="">Select</option>
          {['Brown', 'Black', 'Blue', 'Green', 'Grey', 'Hazel', 'Other'].map(c => (
            <option key={c} value={c.toLowerCase()}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Chest (cm)</label>
        <input {...register('chest')} placeholder="e.g. 90" />
      </div>
      <div>
        <label>Waist (cm)</label>
        <input {...register('waist')} placeholder="e.g. 75" />
      </div>
      <div>
        <label>Shoe Size (EU)</label>
        <input {...register('shoeSize')} placeholder="e.g. 42" />
      </div>
      <div>
        <label>Body Structure</label>
        <select {...register('bodyStructure')}>
          <option value="">Select</option>
          {['Slim', 'Athletic', 'Average', 'Heavy', 'Muscular'].map(b => (
            <option key={b} value={b.toLowerCase()}>{b}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Tattoo</label>
        <select {...register('tattoo')}>
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button type="button" onClick={onBack}>← Back</button>
       <button type="submit" disabled={loading}>
  {loading ? 'Saving...' : isFirstTime ? 'Save & Next →' : 'Save Changes'}
</button>
      </div>
    </form>
  );
};

export default Step2Physical;