import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  bioDescription: z.string().min(50, 'Bio must be at least 50 characters'),
  skillDescription: z.string().optional(),
  facebook: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  twitter: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  linkedin: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

interface Props {
  onSubmit: (data: any) => void;
  onBack: () => void;
  loading: boolean;
  existingProfile: any;
  isFirstTime: boolean;
}

const Step4Bio = ({ onSubmit, onBack, loading, existingProfile, isFirstTime }: Props) => {
   const tp = existingProfile?.talentProfile;

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      bioDescription: tp?.bioDescription || '',
      skillDescription: tp?.skillDescription || '',
      facebook: tp?.facebook || '',
      twitter: tp?.twitter || '',
      linkedin: tp?.linkedin || '',
    }
  });

  const bioValue = watch('bioDescription', '');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Step 4 — Bio & Description</h2>

      <div>
        <label>Bio Description *</label>
        <textarea
          {...register('bioDescription')}
          rows={5}
          placeholder="Tell us about yourself, your experience, and what makes you unique..."
        />
        <small>{bioValue?.length || 0} characters (minimum 50)</small>
        {errors.bioDescription && <p style={{ color: 'red' }}>{errors.bioDescription.message as string}</p>}
      </div>

      <div>
        <label>Skills Description</label>
        <textarea
          {...register('skillDescription')}
          rows={3}
          placeholder="List your key skills and abilities..."
        />
      </div>

      <h3>Social Links (Optional)</h3>
      <div>
        <label>Facebook URL</label>
        <input {...register('facebook')} placeholder="https://facebook.com/yourprofile" />
        {errors.facebook && <p style={{ color: 'red' }}>{errors.facebook.message as string}</p>}
      </div>
      <div>
        <label>Twitter URL</label>
        <input {...register('twitter')} placeholder="https://twitter.com/yourhandle" />
        {errors.twitter && <p style={{ color: 'red' }}>{errors.twitter.message as string}</p>}
      </div>
      <div>
        <label>LinkedIn URL</label>
        <input {...register('linkedin')} placeholder="https://linkedin.com/in/yourprofile" />
        {errors.linkedin && <p style={{ color: 'red' }}>{errors.linkedin.message as string}</p>}
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

export default Step4Bio;