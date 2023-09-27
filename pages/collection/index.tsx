import CollectionShowcase from '@/components/CollectionShowcase';
import { PickContractType } from '@/components/cards';
import { Loader } from '@/components/ui';
import { getCollections } from '@/utils/api';
import { ContractData } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

const buttons = [
  {
    name: 'Testnet',
    status: 1,
  },
  {
    name: 'Mainnet',
    status: 2,
  },
  {
    name: 'Draft',
    status: 0,
  },
  {
    name: 'Show All',
    status: -1,
  },
];

const Collection = () => {
  const { address } = useAccount();
  const router = useRouter();

  const [collectionData, setCollectionData] = useState<ContractData[]>([]);
  const [activeButton, setActiveButton] = useState<number>(3);

  const collectionQuery = useQuery({
    queryKey: ['collection'],
    queryFn: () => getCollections(address as string),
  });

  useEffect(() => {
    if (!collectionQuery.data || collectionQuery.data.contractArray.length === 0) {
      router.push(`/`);
    } else {
      setCollectionData(collectionQuery.data.contractArray);
    }
  }, [collectionQuery.data, router]);

  useEffect(() => {
    collectionQuery.refetch();
  }, [address]);

  return (
    <div>
      <h1 className="pb-6 text-2xl font-semibold md:pb-10 md:text-3xl">Your Collections</h1>
      <div className="flex flex-wrap justify-between pb-6 md:pb-10">
        {buttons.map((button, index) => {
          return (
            <button
              key={index}
              className={`mb-2 rounded-[45px] px-4 py-1 text-xs font-medium lg:mb-0 lg:px-5 lg:py-2 lg:text-sm ${
                button.status === -1 ? 'lg:ml-auto lg:mr-0' : 'lg:ml-0 lg:mr-2'
              }
              ${activeButton === index ? 'bg-secondary text-white' : 'bg-gray-300 text-gray-600'}
              `}
              onClick={() => {
                if (button.status === -1) {
                  setCollectionData(collectionQuery.data?.contractArray || []);
                } else {
                  setCollectionData(
                    collectionQuery.data?.contractArray.filter(
                      (collection) => collection.status === button.status
                    ) || []
                  );
                }
                setActiveButton(index);
              }}
            >
              {button.name}
            </button>
          );
        })}
      </div>
      {collectionQuery.isLoading ? (
        <div className="mt-32 flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 overflow-x-hidden overflow-y-scroll py-2 md:grid-cols-2 lg:max-h-[64vh] lg:gap-6 lg:py-4 xl:grid-cols-3">
          {collectionQuery.data &&
            collectionData.map((collection, index) => {
              return (
                <CollectionShowcase
                  key={index}
                  id={collection.contractId}
                  name={collection.contractName}
                  network={
                    collection?.mainnet ? collection.mainnet.network : collection.testnet.network
                  }
                  status={collection.status}
                  symbol={collection.symbol}
                  type={collection.type}
                  description={collection.description}
                  image={collection.collectionImage}
                />
              );
            })}
        </div>
      )}
      <div className="fixed bottom-0 left-0 flex w-full justify-between bg-white px-4">
        <div className="w-0 sm:w-1/2"></div>
        <PickContractType />
      </div>
    </div>
  );
};

export default Collection;
