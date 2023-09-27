export interface NftType {
  contract: Contract;
  tokenId: string;
  tokenType: string;
  title: string;
  description: string;
  timeLastUpdated: string;
  rawMetadata: RawMetadata;
  tokenUri: TokenURI;
  media: Media[];
}

export interface Contract {
  address: string;
  name: string;
  symbol: string;
  tokenType: string;
  openSea: OpenSea;
  contractDeployer: string;
  deployedBlockNumber: number;
}

export interface OpenSea {
  lastIngestedAt: string;
}

export interface Media {
  gateway: string;
  thumbnail: string;
  raw: string;
  format: string;
  bytes: number;
}

export interface RawMetadata {
  name: string;
  description: string;
  image: string;
  external_url: string;
  attributes: Attribute[];
  fileType: string;
}

export interface Attribute {
  value: string;
  trait_type: string;
}

export interface TokenURI {
  gateway: string;
  raw: string;
}
