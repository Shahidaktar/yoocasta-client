import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { getMyProfile } from '../../api/profile.api';

const TalentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { updateUser } = useAuthStore();

useEffect(() => {
    getMyProfile()
      .then(res => {
        const data = res.data.data;
        setProfile(data);
        // Sync profileCompleted from DB to store
        if (data.profileCompleted !== user?.profileCompleted) {
          updateUser({ profileCompleted: data.profileCompleted });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
        {profile?.image ? (
          <img src={profile.image} alt="Profile" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {user?.firstName?.[0]}
          </div>
        )}
        <div>
          <h2>Welcome, {user?.firstName}!</h2>
          <p style={{ color: '#666', margin: 0 }}>@{user?.username}</p>
        </div>
      </div>

      {/* Profile incomplete banner */}
      {!user?.profileCompleted && (
        <div style={{ background: '#fff3cd', border: '1px solid #ffc107', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <strong>⚠️ Your profile is incomplete</strong>
          <p style={{ margin: '5px 0' }}>Complete your profile to appear in talent listings and get discovered by recruiters.</p>
          <button onClick={() => navigate('/dashboard/talent/profile-setup')}>
            Complete Profile →
          </button>
        </div>
      )}

      {/* Email not verified banner */}
      {!user?.isEmailVerified && (
        <div style={{ background: '#f8d7da', border: '1px solid #dc3545', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <strong>📧 Email not verified</strong>
          <p style={{ margin: '5px 0' }}>Please verify your email to access all features.</p>
          <button onClick={() => navigate('/verify-email-otp')}>Verify Email →</button>
        </div>
      )}

      {/* Dashboard cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>👤 My Profile</h3>
          <p>View and edit your profile</p>
          <Link to="/dashboard/talent/profile">View Profile</Link>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>🎬 Browse Jobs</h3>
          <p>Find casting calls and auditions</p>
          <Link to="/dashboard/talent/jobs">Browse Jobs</Link>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>📋 My Applications</h3>
          <p>Track your job applications</p>
          <Link to="/dashboard/talent/applications">View Applications</Link>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>🖼️ Portfolio</h3>
          <p>Manage your photos and videos</p>
          <Link to="/dashboard/talent/portfolio">Manage Portfolio</Link>
        </div>
      </div>

      {/* Profile summary */}
      {user?.profileCompleted && profile?.talentProfile && (
        <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>Profile Summary</h3>
          <p><strong>Categories:</strong> {profile.talentProfile.categories?.map((c: any) => c.category.name).join(', ') || 'None'}</p>
          <p><strong>Gender:</strong> {profile.talentProfile.gender || '—'}</p>
          <p><strong>Height:</strong> {profile.talentProfile.height || '—'}</p>
          <p><strong>Languages:</strong> {profile.talentProfile.languages?.map((l: any) => l.language.name).join(', ') || '—'}</p>
          <p><strong>Profile Views:</strong> {profile.talentProfile.views || 0}</p>
        </div>
      )}
    </div>
  );
};

export default TalentDashboard;