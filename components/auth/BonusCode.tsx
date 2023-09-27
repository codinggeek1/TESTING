import Image from 'next/image';
// import ReferralCard from './ReferralCard';
import ReferralCard from './ReferralCard';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from '../ui';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { isVerifiedState } from '@/utils/atom';
import { useMutation } from '@tanstack/react-query';
import { createUserId } from '@/utils/api';

interface Props {
  createId: string;
}

const BonusCode = ({ createId }: Props) => {
  const router = useRouter();
  const { address } = useAccount();
  const [isVerified, setIsVerified] = useRecoilState(isVerifiedState);
  const [referralCode, setReferralCode] = useState<string>('');

  const { mutate: createUserIdMutate, data } = useMutation({
    mutationFn: () => createUserId(address as string, createId as string),
    onSuccess: (data) => {
      // TODO: show success toast
      console.log(data);
      localStorage.setItem('createId', data?.createId);
    },
    onError: (error) => {
      // TODO: show error toast
      console.log(error);
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => createUserIdMutate()}
          className="rounded-3xl px-10 py-6 text-xl xl:px-12"
          variant={'secondary'}
          size={'lg'}
        >
          Next
        </Button>
      </DialogTrigger>
      {data?.createId && (
        <DialogContent
          skip
          className="w-[90%] items-center justify-center
      rounded-xl text-center  lg:max-w-[35%] xl:max-w-[30rem]"
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
          <h2 className="text-xl font-semibold">Have Referral Code? </h2>
          <p className=" text-[#C5BABA]">Enter code to get $10 </p>
          <div className="flex items-center justify-between pt-4">
            <Input
              placeholder="Enter Code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="mr-4"
            />
            <ReferralCard referralCode={referralCode} />
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default BonusCode;
