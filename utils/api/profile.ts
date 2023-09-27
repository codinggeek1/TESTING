import axios from 'axios';
import { BACKEND_URL } from '../env';
import { ProfileRequest, ProfileResponse } from '../types';

export const getProfile = async (createId: string) => {
  const res = await axios.get(
    `${BACKEND_URL}/v2/profile/get/${createId}`,

    {
      headers: {
        'Content-Type': 'application/json',
        'api-key': '123456789',
      },
    }
  );
  return res.data as ProfileResponse;
};

export const updateProfile = async (createId: string, profile: ProfileRequest) => {
  const res = await axios.post(`${BACKEND_URL}/v2/profile/update/${createId}`, profile, {
    headers: {
      'Content-Type': 'application/json',
      'api-key': '123456789',
    },
  });
  return res.data as ProfileResponse;
};

export const createProfile = async (profile: ProfileRequest) => {
  const res = await axios.post(`${BACKEND_URL}/v2/profile/create`, profile, {
    headers: {
      'Content-Type': 'application/json',
      'api-key': '123456789',
    },
  });
  return res.data as ProfileResponse;
};

export const deleteProfile = async (createId: string) => {
  const res = await axios.delete(`${BACKEND_URL}/v2/profile/delete/${createId}`, {
    headers: {
      'Content-Type': 'application/json',
      'api-key': '123456789',
    },
  });
  return res.data as ProfileResponse;
};
