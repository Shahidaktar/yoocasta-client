import api from './axios';

export const getPublicProfile = (username: string) => api.get(`/talents/${username}`);