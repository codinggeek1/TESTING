import { isVerifiedState } from '@/utils/atom';
import { NextComponentType, NextPageContext } from 'next';
import { AppProps } from 'next/app';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Navbar from '../navigation/Navbar';
import SideNavbar from '../navigation/SideNavbar';
import LoginNavbar from './LoginNavbar';

type VerificationProviderProps = {
  Component: NextComponentType<NextPageContext, any, any>;
  pageProps: AppProps;
};

const VerificationProvider = ({ Component, pageProps }: VerificationProviderProps) => {
  const router = useRouter();
  const [isVerified, setIsVerified] = useRecoilState(isVerifiedState);

  const verify = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: verify token
      setIsVerified(true);
      if (router.pathname === '/login') {
        router.push('/');
      }
    } else {
      setIsVerified(false);
      if (router.pathname.split('/')[1] !== 'login') {
        router.push('/login');
      }
    }
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <>
      {isVerified ? (
        <>
          <Navbar />
          <SideNavbar />
          <div className="px-3 py-4 md:pl-24 xl:pl-28">
            <Component {...pageProps} />
          </div>
        </>
      ) : router.pathname.split('/')[1] === 'login' ? (
        <div className="h-[100dvh] overflow-y-hidden p-5 lg:p-0">
          <LoginNavbar />
          <Component {...pageProps} />
        </div>
      ) : (
        <div className="flex h-screen w-screen items-center justify-center">
          <Image src="/create-black-logo.svg" width={250} height={250} alt="Logo" />
        </div>
      )}
    </>
  );
};

export default VerificationProvider;
