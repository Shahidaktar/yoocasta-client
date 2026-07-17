import api from './axios';

export const submitApplication = (roleId: string, formData: any) =>
  api.post('/applications', { roleId, formData });

export const getMyApplications = () =>
  api.get('/applications');
