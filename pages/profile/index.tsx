import { Button, Loader } from '@/components/ui';
import { getProfile } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

const Index = () => {
  const createId = localStorage.getItem('createId');
  const { address } = useAccount();
  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(createId as string),
  });
  const router = useRouter();

  useEffect(() => {
    if (profileQuery.data) {
      router.push(`/profile/${address}`);
    }
  }, [profileQuery.data]);

  useEffect(() => {
    profileQuery.refetch();
  }, [address]);

  if (profileQuery.isLoading || profileQuery.data) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <Loader width="80px" height="80px" />
      </div>
    );
  }
  return (
    <div>
      <h1 className="pb-6 text-2xl font-semibold md:pb-10 md:text-3xl">Your Profile</h1>
      <div className="flex flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed border-gray-800 px-4 py-6 sm:gap-8 sm:px-8 lg:py-10 xl:mx-20 xl:gap-12 xl:py-16">
        <Image
          src="/profile-center.svg"
          width={250}
          height={250}
          alt="Profile"
          className="lg:h-[12rem] lg:w-[18rem]"
        />
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl font-bold lg:text-3xl">Create your profile</p>
          <p className="text-medium text-center lg:mx-auto lg:w-3/5">
            Make your minting experience unique by creating a profile that reflects your needs and
            preferences.
          </p>
        </div>
        <Button
          size={'lg'}
          variant={'secondary'}
          className="px-8 lg:text-base"
          onClick={() => {
            router.push(`/profile/${address}/create`);
          }}
        >
          Create Profile
        </Button>
      </div>
    </div>
  );
};

export default Index;
