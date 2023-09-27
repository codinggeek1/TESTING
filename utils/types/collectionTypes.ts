export interface CollectionShowcaseProps {
  id: string;
  image?: string;
  name: string;
  symbol: string;
  description?: string;
  network?: string;
  type: string;
  status: number;
}

export interface CollectionData {
  walletAddress: string;
  contractArray: ContractData[];
}

export interface ContractData {
  symbol: string;
  collectionImage: string;
  contractId: string;
  description: string;
  contractName: string;
  type: string;
  testnet: Net;
  mainnet: Net;
  status: number;
}

export interface Net {
  type: string;
  contractAddress: string;
  network: string;
}
