import api from './axios';
import { getProfileOptions } from './profile.api'; // Reuse talent's options fetcher

export const getRecruiterProfile = () => api.get('/recruiter/profile');
export const updateRecruiterProfile = (data: any) => api.put('/recruiter/profile', data);
export const updateRecruiterLocation = (cityId: string | null) => api.put('/recruiter/profile/location', { cityId });

export const uploadCompanyLogo = (file: File) => {
  const formData = new FormData();
  formData.append('logo', file);
  return api.post('/recruiter/profile/logo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const uploadTradeLicense = (file: File) => {
  const formData = new FormData();
  formData.append('licenseFile', file);
  return api.post('/recruiter/profile/license', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};