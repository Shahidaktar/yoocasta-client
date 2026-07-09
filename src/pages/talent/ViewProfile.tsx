import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProfile } from '../../api/profile.api';

const ViewProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyProfile()
      .then(res => setProfile(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>Profile not found</p>;

  const tp = profile.talentProfile;

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>My Profile</h2>
        <button onClick={() => navigate('/dashboard/talent/profile-setup')}>Edit Profile</button>
      </div>

      {/* Profile Photo + Basic */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
        {profile.image ? (
          <img src={profile.image} alt="Profile" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>
            {profile.firstName?.[0]}
          </div>
        )}
        <div>
          <h3>{profile.firstName} {profile.middleName} {profile.lastName}</h3>
          <p>@{profile.username}</p>
          <p>📧 {profile.email}</p>
          {profile.phone && <p>📞 {profile.phone}</p>}
          {profile.whatsappNo && <p>💬 WhatsApp: {profile.whatsappNo}</p>}
          <p>✅ {profile.isVerified ? 'Verified Talent' : 'Not Verified'}</p>
        </div>
      </div>

      {/* Basic Info */}
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '15px' }}>
        <h3>Basic Info</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div><strong>Gender:</strong> {tp?.gender || '—'}</div>
          <div><strong>Date of Birth:</strong> {tp?.dob ? new Date(tp.dob).toLocaleDateString() : '—'}</div>
          <div><strong>Age:</strong> {tp?.age || '—'}</div>
          <div><strong>Nationality:</strong> {profile.nationality?.name || '—'}</div>
          <div><strong>Ethnicity:</strong> {tp?.ethnicity?.name || '—'}</div>
          <div><strong>City:</strong> {tp?.city?.name || '—'}</div>
          <div><strong>Country:</strong> {tp?.city?.country?.name || '—'}</div>
          <div><strong>Address:</strong> {tp?.address || '—'}</div>
        </div>
        <div style={{ marginTop: '10px' }}>
          <strong>Languages:</strong> {tp?.languages?.map((l: any) => l.language.name).join(', ') || '—'}
        </div>
        <div style={{ marginTop: '5px' }}>
          <strong>Dialects:</strong> {tp?.dialects?.map((d: any) => d.dialect.name).join(', ') || '—'}
        </div>
      </div>

      {/* Physical Attributes */}
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '15px' }}>
        <h3>Physical Attributes</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          <div><strong>Height:</strong> {tp?.height || '—'} cm</div>
          <div><strong>Weight:</strong> {tp?.weight || '—'} kg</div>
          <div><strong>Hair Color:</strong> {tp?.hairColor || '—'}</div>
          <div><strong>Hair Type:</strong> {tp?.hairType || '—'}</div>
          <div><strong>Hair Length:</strong> {tp?.hairLength || '—'}</div>
          <div><strong>Eye Color:</strong> {tp?.eyeColor || '—'}</div>
          <div><strong>Chest:</strong> {tp?.chest || '—'} cm</div>
          <div><strong>Waist:</strong> {tp?.waist || '—'} cm</div>
          <div><strong>Shoe Size:</strong> {tp?.shoeSize || '—'}</div>
          <div><strong>Body Structure:</strong> {tp?.bodyStructure || '—'}</div>
          <div><strong>Tattoo:</strong> {tp?.tattoo || '—'}</div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '15px' }}>
        <h3>Categories</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {tp?.categories?.length > 0
            ? tp.categories.map((c: any) => (
                <span key={c.category.id} style={{ padding: '4px 12px', background: '#333', color: 'white', borderRadius: '20px', fontSize: '14px' }}>
                  {c.category.name}
                </span>
              ))
            : <p>No categories selected</p>
          }
        </div>

        {/* Category Attributes */}
        {tp?.attributes?.length > 0 && (
          <div style={{ marginTop: '15px' }}>
            <h4>Skills & Attributes</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {tp.attributes.map((attr: any) => (
                <div key={attr.id}>
                  <strong>{attr.key.replace(/_/g, ' ')}:</strong> {attr.value}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bio */}
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '15px' }}>
        <h3>Bio & Description</h3>
        <p><strong>Bio:</strong></p>
        <p style={{ whiteSpace: 'pre-wrap' }}>{tp?.bioDescription || '—'}</p>
        {tp?.skillDescription && (
          <>
            <p><strong>Skills:</strong></p>
            <p style={{ whiteSpace: 'pre-wrap' }}>{tp.skillDescription}</p>
          </>
        )}
      </div>

      {/* Social Links */}
      {(tp?.facebook || tp?.twitter || tp?.linkedin) && (
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '15px' }}>
          <h3>Social Links</h3>
          {tp?.facebook && <p><a href={tp.facebook} target="_blank" rel="noreferrer">Facebook</a></p>}
          {tp?.twitter && <p><a href={tp.twitter} target="_blank" rel="noreferrer">Twitter</a></p>}
          {tp?.linkedin && <p><a href={tp.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></p>}
        </div>
      )}

      {/* Missing fields warning */}
      {!profile.profileCompleted && (
        <div style={{ background: '#fff3cd', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
          <strong>⚠️ Missing fields:</strong>
          <ul>
            {!tp?.gender && <li>Gender</li>}
            {!tp?.dob && <li>Date of Birth</li>}
            {!tp?.height && <li>Height</li>}
            {!tp?.bioDescription && <li>Bio Description</li>}
            {(!tp?.categories || tp.categories.length === 0) && <li>Categories</li>}
            {!profile.image && <li>Profile Photo</li>}
          </ul>
          <button onClick={() => navigate('/dashboard/talent/profile-setup')}>Complete Profile →</button>
        </div>
      )}

      {/* Portfolio preview */}
      {tp?.media?.length > 0 && (
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>Portfolio</h3>
            <button onClick={() => navigate('/dashboard/talent/portfolio')}>Manage Portfolio</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
            {tp.media.slice(0, 6).filter((m: any) => m.type === 'IMAGE').map((m: any) => (
              <img key={m.id} src={m.url} alt="" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ViewProfile;