import { Network } from 'alchemy-sdk';
import {
  ALCHEMY_API_KEY_ETHEREUM,
  ALCHEMY_API_KEY_GOERLI,
  ALCHEMY_API_KEY_OPTIMISM,
  ALCHEMY_API_KEY_POLYGON,
} from './env';

export const getAlchemyApi = (
  network: 'goerli' | 'matic' | 'ethereum' | 'optimism' | string = 'goerli'
) => {
  if (network === 'goerli') {
    return ALCHEMY_API_KEY_GOERLI;
  } else if (network === 'matic') {
    return ALCHEMY_API_KEY_POLYGON;
  } else if (network === 'ethereum') {
    return ALCHEMY_API_KEY_ETHEREUM;
  } else if (network === 'optimism') {
    return ALCHEMY_API_KEY_OPTIMISM;
  }
};

export const getNetwork = (
  network:
    | 'goerli'
    | 'matic'
    | 'ethereum'
    | 'optimism'
    | 'Goerli'
    | 'Matic'
    | 'Ethereum'
    | 'Optimism'
    | string = 'goerli'
) => {
  if (network === 'goerli' || network === 'Goerli') {
    return Network.ETH_GOERLI;
  } else if (network === 'matic' || network === 'Matic') {
    return Network.MATIC_MAINNET;
  } else if (network === 'ethereum' || network === 'Ethereum') {
    return Network.ETH_MAINNET;
  } else if (network === 'optimism' || network === 'Optimism') {
    return Network.OPT_MAINNET;
  }
};
