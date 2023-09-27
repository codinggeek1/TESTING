import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from '../ui';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isVerifiedState } from '@/utils/atom';
import { sendTransaction, verifyReferralCode } from '@/utils/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { SendTransactionBody } from '@/utils/types/token';

interface Props {
  referralCode: string;
}

const ReferralCard = ({ referralCode }: Props) => {
  const { address } = useAccount();

  const verifyReferralCodeQuery = useQuery({
    queryKey: ['verifyReferralCode'],
    queryFn: () => verifyReferralCode(referralCode as string),
    enabled: false,
  });

  const backendData = {
    address,
    usdAmount: 0,
    cr8Tokens: 100,
    referralCode: verifyReferralCodeQuery.data?.sharedCode,
    bonusCr8Tokens: 0,
    txHash: '0txHash',
  };

  const {mutate: sendTxMutate, data: txData} = useMutation({
    /*@ts-ignore */
    mutationKey: ['sendTransaction'],
    mutationFn: () => sendTransaction(backendData as SendTransactionBody),
    onSuccess: (res) => {
      console.log({ res });
    },
    enabled: false,
  });

  console.log(verifyReferralCodeQuery.data?.sharedCode);
  useEffect(() => {
    if (verifyReferralCodeQuery.data?.sharedCode) {
      console.log('sending tx');
      sendTxMutate();
    }
  }, [verifyReferralCodeQuery.data]);

  const router = useRouter();
  const [isVerified, setIsVerified] = useRecoilState(isVerifiedState);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => verifyReferralCodeQuery.refetch()}
          className="rounded px-10 py-6 text-xl xl:px-12"
          variant={'secondary'}
          size={'lg'}
        >
          Claim
        </Button>
      </DialogTrigger>
      {verifyReferralCodeQuery?.data?.sharedCode && txData?.success && (
        <DialogContent
          skip
          className="w-[95%] items-center justify-center
     gap-4 rounded-xl py-8 text-center lg:max-w-[40%] xl:max-w-[33rem]"
        >
          <DialogHeader className="absolute right-4 top-4">
            <button
              onClick={() => {
                setIsVerified(true);
                router.push(`/profile/${address}/create`);
              }}
            >
              skip
            </button>
          </DialogHeader>
          <Image src="/bonus.svg" width={150} height={150} alt="bonus" className="mx-auto" />
          <h1 className="py-4 text-xl font-semibold">Successfully Claimed 100 Create Tokens </h1>

          <div className="">
            <Button
            onClick={() => {
              // TODO: show toadt that referral code is copied
              navigator.clipboard.writeText(txData?.sharedCode)
            }}
              className=" rounded px-10 py-6 text-xl xl:px-12"
              variant={'secondary'}
              size={'lg'}
            >
              Refer and Earn
            </Button>
            <p className="py-4">Or</p>
            <Button
              className=" rounded px-10 py-6 text-xl xl:px-12"
              variant={'secondary'}
              size={'lg'}
              onClick={() => window.open('https://token.createprotocol.org/')}
            >
              Invest Now
            </Button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};
// };
export default ReferralCard;
