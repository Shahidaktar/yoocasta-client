import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfileOptions, updateBasicInfo, updatePhysicalAttributes, updateCategoriesSkills, updateBioDescription, uploadProfilePhoto, getMyProfile } from '../../api/profile.api';
import { useAuthStore } from '../../store/authStore';
import Step1BasicInfo from './profile-steps/Step1BasicInfo';
import Step2Physical from './profile-steps/Step2Physical';
import Step3Categories from './profile-steps/Step3Categories';
import Step4Bio from './profile-steps/Step4Bio';
import Step5Photo from './profile-steps/Step5Photo';
import PortfolioTab from './profile-steps/PortfolioTab';
import CareerCourseTab from './profile-steps/CareerCourseTab'; // <-- ADD THIS LINE

export interface FormOptions {
  nationalities: any[];
  countries: any[];
  cities: any[];
  categories: any[];
  languages: any[];
  dialects: any[];
  ethnicities: any[];
}

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState(1);
  const [options, setOptions] = useState<FormOptions | null>(null);
  const [existingProfile, setExistingProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const isFirstTime = !user?.profileCompleted;

  useEffect(() => {
    Promise.all([getProfileOptions(), getMyProfile()])
      .then(([optRes, profileRes]) => {
        setOptions(optRes.data.data);
        setExistingProfile(profileRes.data.data);
      });
  }, []);

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleStep1 = async (data: any) => {
    try {
      setLoading(true); setError('');
      await updateBasicInfo(data);
      showSuccess('Basic info saved!');
      if (isFirstTime) setActiveTab(2);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save');
    } finally { setLoading(false); }
  };

  const handleStep2 = async (data: any) => {
    try {
      setLoading(true); setError('');
      await updatePhysicalAttributes(data);
      showSuccess('Physical attributes saved!');
      if (isFirstTime) setActiveTab(3);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save');
    } finally { setLoading(false); }
  };

  const handleStep3 = async (data: any) => {
    try {
      setLoading(true); setError('');
      await updateCategoriesSkills(data);
      showSuccess('Categories saved!');
      if (isFirstTime) setActiveTab(4);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save');
    } finally { setLoading(false); }
  };

  const handleStep4 = async (data: any) => {
    try {
      setLoading(true); setError('');
      await updateBioDescription(data);
      showSuccess('Bio saved!');
      if (isFirstTime) setActiveTab(5);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save');
    } finally { setLoading(false); }
  };

  const handleStep5 = async (file: File) => {
    try {
      setLoading(true); setError('');
      await uploadProfilePhoto(file);
      updateUser({ profileCompleted: true });
      showSuccess('Profile photo uploaded!');
      // Reload profile
      const profileRes = await getMyProfile();
      setExistingProfile(profileRes.data.data);
      if (isFirstTime) navigate('/dashboard/talent');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload');
    } finally { setLoading(false); }
  };

  if (!options || !existingProfile) return <p>Loading...</p>;

    const TABS = [
    { id: 1, label: 'Basic Info' },
    { id: 2, label: 'Physical' },
    { id: 3, label: 'Categories' },
    { id: 4, label: 'Bio' },
    { id: 5, label: 'Profile Photo' },
    ...(!isFirstTime ? [
      { id: 6, label: '📸 Portfolio' },
      { id: 7, label: '💼 Career & Courses' }, // <-- ADD THIS LINE
    ] : []),
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>{isFirstTime ? 'Complete Your Profile' : 'Edit Profile'}</h2>
        {!isFirstTime && (
          <button onClick={() => navigate('/dashboard/talent/profile')}>← Back to Profile</button>
        )}
      </div>

      {/* Tab Headers */}
      <div style={{ display: 'flex', gap: '5px', marginBottom: '25px', flexWrap: 'wrap' }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => !isFirstTime && setActiveTab(tab.id)}
            style={{
              padding: '8px 16px',
              background: activeTab === tab.id ? '#333' : '#eee',
              color: activeTab === tab.id ? 'white' : '#333',
              border: 'none',
              borderRadius: '6px',
              cursor: isFirstTime ? 'default' : 'pointer',
              opacity: isFirstTime && tab.id > activeTab ? 0.5 : 1,
            }}
          >
            {isFirstTime && tab.id < activeTab ? '✅ ' : ''}{tab.label}
          </button>
        ))}
      </div>

      {/* Messages */}
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      {successMsg && <p style={{ color: 'green', marginBottom: '10px' }}>✅ {successMsg}</p>}

      {/* Tab Content */}
      {activeTab === 1 && (
        <Step1BasicInfo
          options={options}
          onSubmit={handleStep1}
          loading={loading}
          existingProfile={existingProfile}
          isFirstTime={isFirstTime}
        />
      )}
      {activeTab === 2 && (
        <Step2Physical
          onSubmit={handleStep2}
          onBack={() => setActiveTab(1)}
          loading={loading}
          existingProfile={existingProfile}
          isFirstTime={isFirstTime}
        />
      )}
      {activeTab === 3 && (
        <Step3Categories
          options={options}
          onSubmit={handleStep3}
          onBack={() => setActiveTab(2)}
          loading={loading}
          existingProfile={existingProfile}
          isFirstTime={isFirstTime}
        />
      )}
      {activeTab === 4 && (
        <Step4Bio
          onSubmit={handleStep4}
          onBack={() => setActiveTab(3)}
          loading={loading}
          existingProfile={existingProfile}
          isFirstTime={isFirstTime}
        />
      )}
      {activeTab === 5 && (
        <Step5Photo
          onSubmit={handleStep5}
          onBack={() => setActiveTab(4)}
          loading={loading}
          existingProfile={existingProfile}
          isFirstTime={isFirstTime}
        />
      )}
      {activeTab === 6 && !isFirstTime && (
        <PortfolioTab existingProfile={existingProfile} />
      )}
      {activeTab === 7 && !isFirstTime && (
        <CareerCourseTab existingProfile={existingProfile} />
      )}
    </div>
  );
};

export default ProfileSetup;