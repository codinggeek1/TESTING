import { PickContractType } from '@/components/cards';
import { Loader } from '@/components/ui';
import { getCollections } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

const Home: NextPage = () => {
  const { address } = useAccount();
  const router = useRouter();

  const collectionQuery = useQuery({
    queryKey: ['collection'],
    queryFn: () => getCollections(address as string),
  });

  useEffect(() => {
    if (collectionQuery.data && collectionQuery.data?.contractArray.length > 0) {
      router.push(`/collection`);
    }
    console.log(collectionQuery.data);
  }, [collectionQuery.data]);

  useEffect(() => {
    collectionQuery.refetch();
  }, [address]);

  if (
    collectionQuery.isLoading ||
    (collectionQuery.data && collectionQuery.data?.contractArray.length > 0)
  ) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <Loader width="80px" height="80px" />
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>Creator console</title>
        <meta name="description" content="No code NFT platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="pb-6 text-2xl font-semibold md:pb-10 md:text-3xl">Your Collections</h1>
        <div className="space-y-4 rounded-xl border-2 border-dashed border-gray-800 p-2 py-4 lg:mx-6 lg:flex lg:items-center lg:justify-start lg:px-4 xl:mx-auto xl:w-[90%] xl:gap-8">
          <Image
            src="/collection-p-2.png"
            width={375}
            height={375}
            alt="Collection"
            className="h-[25rem] w-full rounded-xl object-cover sm:mx-auto sm:w-3/4 lg:mx-0 lg:h-[60vh] xl:h-[65vh] xl:w-1/3"
          />
          <div className="flex flex-col gap-4 px-2 sm:px-4 lg:gap-6 2xl:w-3/5">
            <p className="text-lg font-semibold lg:text-2xl xl:text-3xl 2xl:text-4xl">
              Welcome to Console,
            </p>
            <p className="text-medium lg:text-xl xl:text-2xl 2xl:text-3xl">
              Effortlessly mint your Creation (NFT) and list it on top marketplaces across the globe
              while also analyzing its reach and engagement on Console.
            </p>
            <div>
              <PickContractType />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
