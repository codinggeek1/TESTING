import { Button, Loader } from '@/components/ui';
import { getCollection, getNft } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useAccount, useNetwork } from 'wagmi';

export const Creation = () => {
  const router = useRouter();
  const { nftId, id } = router.query;
  const { address } = useAccount();

  const collectionQuery = useQuery({
    queryKey: ['collection', id],
    queryFn: () => getCollection(address as string, id as string),
    enabled: !!id,
  });

  const nftQuery = useQuery({
    queryKey: ['collection', id, nftId],
    queryFn: () =>
      getNft(
        collectionQuery.data?.mainnet?.contractAddress ||
          collectionQuery.data?.testnet?.contractAddress,
        collectionQuery.data?.mainnet?.network || collectionQuery.data?.testnet?.network,
        nftId as string
      ),
    enabled: !!collectionQuery.data,
  });

  if (nftQuery.isLoading || collectionQuery.isLoading) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader />
      </div>
    );
  } else {
    return (
      <div>
        <div className="mb-6 flex items-center gap-1">
          <ChevronLeft
            className="h-6 w-6 hover:cursor-pointer"
            onClick={() => router.push(`/collection/${id}`)}
          />
          <h1 className="text-2xl font-semibold md:text-3xl">{nftQuery.data?.title}</h1>
        </div>
        <div className="flex flex-col justify-center gap-10 px-2 py-2 sm:px-8 lg:flex-row lg:items-center lg:justify-start lg:pt-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={nftQuery.data?.media[0]?.gateway ?? '/creation.svg'}
            alt="profile"
            className="h-[12rem] w-full rounded-xl object-cover sm:h-[16rem] lg:h-[70vh] lg:w-1/2 xl:w-2/5 2xl:w-1/3"
          />
          <div className="mx-auto flex w-[90%] flex-col justify-center gap-6 border-t-2 py-6 sm:gap-8 sm:border-t-2 md:mx-0 md:w-3/4 md:border-t-2 lg:gap-12 lg:border-l-2 lg:border-t-0 lg:pl-10 lg:pr-0 xl:w-2/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium lg:text-xl">
                  {nftQuery.data?.title} | #{nftQuery.data?.tokenId}
                </p>
                <p className="truncate">By : {address?.slice(0, 10)}...</p>
              </div>
              <p className="rounded-3xl bg-[#8E30FF] px-4 py-1 text-sm text-white">Goerli</p>
            </div>
            <p className="text-sm lg:text-base">
              {nftQuery.data?.description ?? 'Description of the creation goes here'}
            </p>
            <div className="flex items-center gap-5 text-sm">
              <div className="flex flex-col items-center">
                <p className="font-semibold lg:text-[16px]">
                  {/* @ts-ignore */}
                  {(nftQuery.data?.media[0]?.bytes / 1000000).toFixed(2)} MB
                </p>
                <p className="text-xs lg:text-sm">Full Size</p>
              </div>
              <div className="h-6 w-0.5 bg-black"></div>
              <div className="flex flex-col items-center">
                <p className="font-semibold lg:text-[16px]">
                  {nftQuery.data?.media[0].format?.toUpperCase()}
                </p>
                <p className="text-xs lg:text-sm">Type</p>
              </div>
            </div>
            <div className="flex justify-between gap-4 lg:gap-6">
              <Button
                variant={'outline'}
                className="w-full"
                onClick={() => {
                  window.open(nftQuery.data?.tokenUri?.gateway, '_blank');
                }}
              >
                Metadata
              </Button>
              <Button
                variant={'default'}
                className="w-full"
                onClick={() => router.push(`/collection/${id}/creation/${nftId}/list`)}
              >
                List
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Creation;
