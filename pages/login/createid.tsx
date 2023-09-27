import { Button } from '@/components/ui';
import { isVerifiedState } from '@/utils/atom';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { useAccount } from 'wagmi';
import BonusCode from '@/components/auth/BonusCode';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { useMutation } from '@tanstack/react-query';
import { createProfile, createUserId } from '@/utils/api';
import { ProfileRequest } from '@/utils/types';
const formSchema = z.object({
  create: z.string().min(3, 'create ID must be at least 3 characters'),
});

const CreateId = (props: { errormessage: string }) => {
  const [createId, setCreateId] = useState('');
  const [isVerified, setIsVerified] = useRecoilState(isVerifiedState);
  // const inputRef = useRef<HTMLInputElement>;
  const router = useRouter();
  const { address } = useAccount();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="flex h-full w-full items-start justify-center">
      <div className="mt-20 flex flex-col items-center justify-center gap-4 text-center xl:gap-8">
        <Image
          src="/createid-profile.png"
          width="250"
          height="250"
          alt="profile"
          className="-mb-8 "
        />
        <h1 className="text-3xl font-semibold xl:text-4xl">Introduce Yourself</h1>
        <Input
          placeholder="Enter your Create ID"
          value={createId}
          // ref={inputRef}
          aria-errormessage="plesae enter create id"
          onChange={(e) => setCreateId(e.target.value)}
          className="border-black py-6 text-center text-base xl:text-xl"
        />

        <p className="w-[90%] font-light text-[#260052] lg:w-3/4 xl:text-lg">
          A universal create id for you within the create ecosystem
        </p>
        <BonusCode createId={createId} />
        {/* <Button
          className="rounded-3xl px-10 py-6 text-xl xl:px-12"
          variant={'secondary'}
          size={'lg'}
          onClick={handleNext}
        >
          Next
        </Button> */}
        <div className="absolute bottom-6 mx-auto flex w-full items-center justify-center gap-2 text-muted-foreground">
          <span>Powered By</span>
          <Image src="/create-black-logo.svg" width={35} height={35} alt="Logo" />
          <span className="text-sm">CREATE PROTOCOL</span>
        </div>
      </div>
    </div>
  );
};

export default CreateId;
