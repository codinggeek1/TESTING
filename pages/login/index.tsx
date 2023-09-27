import { Button, Loader } from '@/components/ui';
import { getMessage, getProfile, login } from '@/utils/api';
import { isVerifiedState } from '@/utils/atom';
import { useAuth } from '@arcana/auth-react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Wallet2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useAccount, useSignMessage } from 'wagmi';
import { useLocalStorage } from '@/lib/hooks';
import { date, string } from 'zod';

const Index = () => {
  const { openConnectModal } = useConnectModal();
  const auth = useAuth();
  const router = useRouter();
  const { address, isConnected, isDisconnected } = useAccount();
  const [isVerifying, setIsVerifying] = useState(false);
  const { data: signature, isError, isSuccess, error, signMessage } = useSignMessage();

  const { data: messageData } = useQuery({
    queryKey: ['message'],
    queryFn: () => getMessage(),
    enabled: address ? true : false,
  });

  // generate signature
  const genarateSignature = () => {
    if (isDisconnected) return;
    if (localStorage.getItem('token')) return;

    setIsVerifying(true);
    // TODO: if user is authenticated and has JWT then don't generate signature set the session
    signMessage({
      message: messageData?.message || 'Sign the message to login',
    });
  };

  const { mutate: loginMutate, data } = useMutation({
    mutationFn: () => login(address as string, signature as string),
    onSuccess: (data) => {
      // TODO: set the session and show success toast
      console.log(data);
      localStorage.setItem('token', data?.jwt);
      localStorage.setItem('createId', data?.createId);

      // redirect to the crete id page if the user has no create id
      if (data?.createId === address) {
        router.push('/login/createid');
      } else {
        router.push('/');
      }
      setIsVerifying(false);
    },
    onError: (error) => {
      // TODO: show error toast
      console.log(error);
      setIsVerifying(false);
    },
  });

  useEffect(() => {
    if (isError && error?.name === 'UserRejectedRequestError') {
      // TODO: show error toast and disconnect the wallet
      console.log('User rejected the signature request');
      setIsVerifying(false);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess && signature) {
      loginMutate();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isConnected && address) {
      genarateSignature();
    }
  }, [isConnected, address]);

  if (isVerifying) {
    return (
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-4">
        <Loader width="80px" height="80px" />
        <p className="text-center text-xl font-semibold">Verifying...</p>
      </div>
    );
  }
  return (
    <div className="flex h-full w-full items-start justify-center xl:items-center xl:gap-4">
      <img
        src="/rocket.png"
        width={500}
        height={500}
        alt="Login"
        className="hidden h-full w-3/5 object-contain xl:block"
      />
      <div className="xl:w-2/5">
        <div className="mt-20 flex flex-col items-center justify-center gap-4 rounded-3xl border-black bg-[#c78ffb26] pt-4 text-center shadow-[2px_2px_3px_2px_#44155B]  lg:border lg:px-10 lg:py-14 xl:-mt-16 xl:mr-12 xl:w-fit 2xl:-mt-24 2xl:px-16 2xl:py-20">
          <p className="text-xl font-medium text-muted-foreground sm:text-2xl">
            Future of Creation
          </p>
          <h1 className="px-2 text-2xl font-semibold sm:text-3xl">Welcome to Creator Console!</h1>
          <div className="flex flex-col items-center gap-5  py-6 md:py-8">
            <Button
              variant="outline"
              size="lg"
              className="w-full rounded-2xl border-black/50 text-xs sm:text-base md:py-6"
              onClick={() => openConnectModal && openConnectModal()}
            >
              <Wallet2 size={22} className="mr-3" />
              Connect With Wallet
            </Button>
            <p className="text-muted-foreground">Or</p>
            <Button
              variant="outline"
              size="lg"
              className="w-full rounded-2xl border-black/50 text-xs sm:text-base md:py-6"
              onClick={() => auth.loginWithSocial('google').then(() => console.log(address))}
            >
              <Image src="/google-logo.svg" width={32} height={32} alt="Google" className="mr-1" />
              Continue With Google
            </Button>
          </div>
          <div className="absolute bottom-2 mx-auto  flex w-full items-center justify-center gap-2 text-muted-foreground sm:bottom-6 lg:static">
            <span>Powered By</span>
            <Image src="/create-black-logo.svg" width={35} height={35} alt="Logo" />
            <span className="text-sm">CREATE PROTOCOL</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
