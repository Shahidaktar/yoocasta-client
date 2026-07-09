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

    // Validate
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(selected.type)) {
      setError('Only JPEG, PNG, and WebP images allowed');
      return;
    }
    if (selected.size > 5 * 1024 * 1024) {
      setError('File size must be under 5MB');
      return;
    }

    setError('');
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  return (
    <div>
      <h2>Step 5 — Profile Photo</h2>

      {/* Guidelines */}
      <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h4>Photo Guidelines:</h4>
        <ul>
          <li>Clear, recent photo of your face</li>
          <li>Good lighting — no heavy filters</li>
          <li>Plain or simple background preferred</li>
          <li>Format: JPEG, PNG, or WebP</li>
          <li>Maximum size: 5MB</li>
          <li>Recommended: at least 400x400 pixels</li>
        </ul>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Upload Area */}
      <div
        onClick={() => inputRef.current?.click()}
        style={{
          border: '2px dashed #ccc',
          padding: '40px',
          textAlign: 'center',
          cursor: 'pointer',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        {preview ? (
          <img src={preview} alt="Preview" style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '50%' }} />
        ) : (
          <div>
            <p>Click to upload your profile photo</p>
            <p style={{ color: '#999', fontSize: '14px' }}>JPEG, PNG, WebP — Max 5MB</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      {preview && (
        <button type="button" onClick={() => { setPreview(null); setFile(null); }} style={{ marginBottom: '10px' }}>
          Remove Photo
        </button>
      )}

      

      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button type="button" onClick={onBack}>← Back</button>
        {existingProfile?.image && !file && (
  <button
    type="button"
    onClick={() => navigate(isFirstTime ? '/dashboard/talent' : '/dashboard/talent/profile')}
  >
    {isFirstTime ? 'Keep Photo & Finish ✅' : 'Keep Existing Photo'}
  </button>
)}
        <button
          type="button"
          onClick={() => file && onSubmit(file)}
          disabled={loading || !file}
        >
          {loading ? 'Saving...' : isFirstTime ? 'Save & Next →' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default Step5Photo;