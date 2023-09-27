import axios from 'axios';
import { BACKEND_URL } from '../env';

export const getMessage = async () => {
  const { data } = await axios.get(`${BACKEND_URL}/v2/auth/message`, {
    headers: {
      'Content-Type': 'application/json',
      'api-key': '123456789',
    },
  });
  return data;
};

export const login = async (address: string, signature: string) => {
  const { data } = await axios.post(
    `${BACKEND_URL}/v2/auth/login`,

    {
      address,
      signature,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'api-key': '123456789',
      },
    }
  );
  return data;
};


export const createUserId = async (address: string, createId: string) => {
  const { data } = await axios.post(
    `${BACKEND_URL}/v2/auth/createId`,

    {
      address,
      createId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'api-key': '123456789',
      },
    }
  );
  return data;
}