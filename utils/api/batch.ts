import axios from 'axios';
import { BACKEND_URL } from '../env';
import { BackendFile, BatchFileType } from '../types';

export const getBatches = async (address: string) => {
  const res = await axios.get(`${BACKEND_URL}/batch/${address}`);
  return res.data;
};

export const getBatch = async (address: string, id: string) => {
  const res = await axios.get(`${BACKEND_URL}/batch/${address}`);
  return res.data;
};

export const createBatch = async (
  address: string,
  data: {
    batchName: string;
    contractId: string;
    description: string;
    createdBy: string;
    files: BackendFile[];
  }
) => {
  const res = await axios.post(`${BACKEND_URL}/batch/${address}`, data);
  return res.data;
};
