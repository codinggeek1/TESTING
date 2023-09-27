export interface BatchFileType {
  name: string;
  type: string;
  format: string;
  file: string | ArrayBuffer;
  description: string;
  externalUrl: string;
  metadata: Metadata[];
}

export interface Metadata {
  key: string;
  value: string;
}

export interface BackendFile {
  name: string;
  description: string;
  externalUrl: string;
  imageLink: string;
  ipfsLink: string;
  metadata: {
    trait_type: string;
    value: string;
  }[];
}
