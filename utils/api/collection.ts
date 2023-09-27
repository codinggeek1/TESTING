import axios from 'axios';
import { BACKEND_URL } from '../env';
import { CollectionData } from '../types';

export const getCollections = async (address: string) => {
  const res = await axios.get(`${BACKEND_URL}/contractList/${address}`);
  return res.data as CollectionData;
};

export const getCollection = async (address: string, id: string) => {
  const res = await axios.get(`${BACKEND_URL}/contractList/${address}`);
  const data = res.data as CollectionData;
  const collection = data.contractArray.find((contract) => contract.contractId === id);
  if (collection) {
    return collection;
  } else {
    throw new Error('Collection not found');
  }
};
