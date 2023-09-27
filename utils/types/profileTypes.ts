export interface ProfileResponse {
  userName: string;
  socials: Socials;
  email: string;
  name: string;
  walletAddress: string;
  profileImage: string;
  validationErrors: string;
}

export interface Socials {
  twitter: string;
  website: string;
  instagram: string;
  discord: string;
}

export interface ProfileRequest {
  name: string;
  email: string;
  address: string;
  profileImage: string;
  username: string;
  socials: string;
  twitter: string;
  website: string;
  instagram: string;
  discord: string;
}
