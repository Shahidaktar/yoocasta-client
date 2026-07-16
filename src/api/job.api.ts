import api from './axios';

export const getJobOptions = () => api.get('/jobs/options');
export const getMyJobs = () => api.get('/jobs/my-jobs');
export const getJobById = (jobId: string) => api.get(`/jobs/${jobId}`);
export const createJob = (data: any) => api.post('/jobs', data);
export const updateJob = (jobId: string, data: any) => api.put(`/jobs/${jobId}`, data);
export const deleteJob = (jobId: string) => api.delete(`/jobs/${jobId}`);
export const addRole = (jobId: string, data: any) => api.post(`/jobs/${jobId}/roles`, data);
export const updateRole = (jobId: string, roleId: string, data: any) => api.put(`/jobs/${jobId}/roles/${roleId}`, data);
export const deleteRole = (jobId: string, roleId: string) => api.delete(`/jobs/${jobId}/roles/${roleId}`);
