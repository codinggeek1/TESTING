import { Button, CopyText, Loader } from '@/components/ui';
import { toast } from '@/components/ui/use-toast';
import { getProfile } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import { Instagram, Twitter } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

const socials = [
  {
    name: 'Twitter',
    icon: <Twitter className="h-5 w-5 text-black" />,
    link: 'https://twitter.com/',
  },
  {
    name: 'Instagram',
    icon: <Instagram className="h-5 w-5 text-black" />,
    link: 'https://www.instagram.com/',
  },
  {
    name: 'Discord',
    icon: '/discord-black-logo.svg',
    link: 'https://discord.com/',
  },
];

const Index = () => {
  const createId = localStorage.getItem('createId');
  const { address } = useAccount();
  const router = useRouter();

  return (
    <div>
      <h1 className="pb-6 text-2xl font-semibold md:pb-10 md:text-3xl">Your Profile</h1>
      <div className="flex flex-col justify-center gap-10 px-2 py-2 sm:px-8 lg:flex-row lg:items-center lg:justify-start">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={'/profile-center.svg'}
          alt="Profile"
          className="h-[22vh] w-full rounded-xl object-cover sm:h-[25vh] lg:h-[60vh] lg:w-1/2 xl:w-2/5 2xl:w-1/4"
        />
        <div className="flex w-full flex-col justify-center gap-8 sm:px-6 md:px-12 lg:px-0 xl:w-2/5 xl:gap-12">
          <div className="flex items-center gap-2">
            <Image
              src={'/profile-icon.svg'}
              width={50}
              height={50}
              alt="Profile"
              className="h-[3rem] w-[3rem] rounded-full border-2 border-input object-cover lg:h-[4rem] lg:w-[4rem]"
            />
            <div className="flex flex-col">
              <p className="text-base font-medium lg:text-lg">Name</p>
              <p className="text-sm lg:text-base">Username</p>
            </div>
          </div>
          <div className="flex w-full justify-between">
            {socials.map((social) => (
              <a
                href={`${social.link}${
                  // @ts-ignore
                   ''
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 xl:flex-row"
                key={social.name}
              >
                {social.name === 'Discord' ? (
                  <Image src={social.icon as string} width={20} height={20} alt={social.name} />
                ) : (
                  social.icon
                )}
                <p className="text-sm">
                  {/* @ts-ignore */}
                  { social.name}
                </p>
              </a>
            ))}
          </div>
          <div className="flex w-full flex-col gap-3 text-sm lg:text-base">
            <div className="flex items-center justify-between lg:justify-start lg:gap-8">
              <div className="flex gap-2">
                <p>Your Mail ID:</p>
                <p className="font-semibold underline underline-offset-2">Email</p>
              </div>
              <CopyText text={''} />
            </div>
            <div className="flex items-center justify-between lg:justify-start lg:gap-8">
              <div className="flex gap-2">
                <p>Your Wallet ID:</p>
                <p className="font-semibold underline underline-offset-2">{'address' + '...'}</p>
              </div>
              <CopyText text={''} />
            </div>
          </div>
          <Button
            variant={'outline'}
            className="mt-8 self-end px-6 text-base lg:self-start lg:px-8 lg:py-6"
            onClick={() => {
              router.push(`/profile/${address}/edit`);
            }}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;