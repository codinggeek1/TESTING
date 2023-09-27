import axios from 'axios';
import { SendTransactionBody } from '../types/token';
import { TOKEN_BACKEND_URL } from '../env';

export const verifyReferralCode = async (referralCode: string) => {
  const res = await axios.get(`${TOKEN_BACKEND_URL}/api/checkAccess/${referralCode}`);
  return res.data;
};

export const sendTransaction = async (backendData: SendTransactionBody) => {
  const res = await axios.post(`${TOKEN_BACKEND_URL}/api/sendTransaction`, backendData);
  return res.data;
};
