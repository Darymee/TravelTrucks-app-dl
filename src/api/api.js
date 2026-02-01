import { api } from './axios';

export const fetchCampers = async params => {
  const { data } = await api.get('/campers', { params });
  return data;
};

export const fetchCamperById = async id => {
  const { data } = await api.get(`/campers/${id}`);
  return data;
};
