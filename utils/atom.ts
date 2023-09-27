import { atom } from 'recoil';

export const batchMintBasicDataState = atom({
  key: 'batchMintBasicDataState',
  default: {
    name: '',
    createdBy: '',
    externalUrl: '',
    description: '',
  },
});

export const isVerifiedState = atom({
  key: 'isVerifiedState',
  default: false,
});
