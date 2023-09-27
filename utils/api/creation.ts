import { Alchemy } from 'alchemy-sdk';
import { getAlchemyApi, getNetwork } from '../alchemyApi';

export const getNfts = async (address: string | undefined, network: string | undefined) => {
  if (!address || !network) return Error('Missing address or network');
  const config = { apiKey: getAlchemyApi(network), network: getNetwork(network), maxRetries: 5 };
  const alchemy = new Alchemy(config);

  const nfts = await alchemy.nft.getNftsForContract(address);
  return nfts;
};

export const getAllAssets = async (address: string, network: string) => {
  const config = { apiKey: getAlchemyApi(network), network: getNetwork(network), maxRetries: 5 };
  const alchemy = new Alchemy(config);

  try {
    const assets = await alchemy.nft.getNftsForOwner(address);
    return assets.ownedNfts;
  } catch (error) {
    throw new Error('Error fetching assets');
  }
};

export const getNft = async (
  contractAddress: string | undefined,
  network: string | undefined,
  tokenId: string
) => {
  if (!contractAddress || !network) throw new Error('Missing contract address or network');
  const config = { apiKey: getAlchemyApi(network), network: getNetwork(network), maxRetries: 5 };
  const alchemy = new Alchemy(config);

  const nft = await alchemy.nft.getNftMetadata(contractAddress, tokenId);
  return nft;
};
