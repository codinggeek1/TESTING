export interface SendTransactionBody {
  address: string;
  usdAmount: number;
  cr8Tokens: number;
  referralCode: string;
  bonusCr8Tokens: number;
  txHash: string;
}
