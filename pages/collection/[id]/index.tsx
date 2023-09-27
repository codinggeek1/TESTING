import ContractOverview from '@/components/ContractOverview';
import { NftCard, PickCreationType } from '@/components/cards';
import {
  Button,
  CopyText,
  Loader,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { getCollection, getNfts } from '@/utils/api';
import { NftType } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [step, setStep] = useState(0);

  const collectionQuery = useQuery({
    queryKey: ['collection', id],
    queryFn: () => getCollection(address as string, id as string),
    enabled: !!id,
  });

  const creationQuery = useQuery({
    queryKey: ['creations', id],
    queryFn: () =>
      getNfts(
        collectionQuery.data?.mainnet?.contractAddress ||
          collectionQuery.data?.testnet?.contractAddress,
        collectionQuery.data?.mainnet?.network || collectionQuery.data?.testnet?.network
      ),
    enabled: !!collectionQuery.data,
  });

  useEffect(() => {
    if (collectionQuery.data) {
      setStep(1);
    }
  }, [collectionQuery.data]);

  useEffect(() => {
    //@ts-ignore
    if (creationQuery.data && creationQuery.data.nfts?.length > 0) {
      setStep(2);
    }
  }, [creationQuery.data]);

  if (collectionQuery.isLoading) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <Loader width="80px" height="80px" />
      </div>
    );
  }
  return (
    <div>
      <div className="mb-6 flex items-center gap-1">
        <ChevronLeft
          className="h-6 w-6 hover:cursor-pointer"
          onClick={() => router.push(`/collection`)}
        />
        <h1 className="text-2xl font-semibold md:text-3xl">{collectionQuery.data?.contractName}</h1>
      </div>
      <Tabs defaultValue="overview" className="w-full py-2">
        <TabsList className="mb-4 grid grid-cols-3 gap-2 lg:w-1/2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="creations">Creations</TabsTrigger>
          <TabsTrigger value="manage">Manage</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="flex flex-col px-2 py-2">
            <div className="flex items-center justify-between sm:justify-start sm:gap-6">
              <div className="flex flex-col gap-1">
                <p className="text-xl font-semibold">{collectionQuery.data?.symbol}</p>
                <p className="text-medium lg:text-lg">{collectionQuery.data?.type}</p>
              </div>
              <p className="rounded-lg bg-secondary px-3 py-1.5 text-sm text-white">
                {collectionQuery.data?.mainnet?.network || collectionQuery.data?.testnet.network}
              </p>
            </div>
            <div className="flex gap-2 py-4 sm:gap-4">
              <p className="font-semibold">Address:</p>
              <p className="max-w-[100vw] truncate rounded-lg bg-muted px-2 py-0.5">
                {collectionQuery.data?.mainnet?.contractAddress ||
                  collectionQuery.data?.testnet.contractAddress}
              </p>
              <CopyText
                text={
                  collectionQuery.data?.mainnet?.contractAddress ||
                  collectionQuery.data?.testnet.contractAddress
                }
              />
            </div>
            <ContractOverview step={step} />
            <div className="fixed bottom-0 left-0 flex w-full justify-between bg-white px-4">
              <div className="w-0 sm:w-1/2"></div>
              <Button
                className="my-2 w-full sm:w-1/2 lg:my-6 lg:w-1/3 2xl:w-1/4"
                size={'lg'}
                variant={'secondary'}
              >
                {step === 0
                  ? 'Create Collection'
                  : step === 1
                  ? 'Mint an NFT'
                  : 'Extend to Marketplaces'}
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="creations">
          <div className="relative flex flex-col px-2 py-2">
            <div className="flex items-center justify-between lg:py-2">
              <h2 className="text-xl font-semibold lg:text-2xl">Your Creations</h2>
              <Select>
                <SelectTrigger className="w-2/5 lg:w-1/3 xl:w-1/4">
                  <SelectValue placeholder="Single" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="batch">Batch</SelectItem>
                    <SelectItem value="edition">Edition</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid-col-1 grid gap-2 py-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:gap-6 2xl:grid-cols-4">
              {creationQuery.isLoading ? (
                <div className="mt-20 flex justify-center">
                  <Loader />
                </div>
              ) : // @ts-ignore
              creationQuery.data && creationQuery.data.nfts?.length === 0 ? (
                <p className="absolute left-[46%] top-[45%] mt-20 text-xl font-semibold">
                  No creations found
                </p>
              ) : (
                creationQuery.data &&
                // @ts-ignore
                creationQuery.data.nfts?.map((creation: NftType) => (
                  <NftCard
                    className="max-w-sm sm:max-w-full"
                    key={creation.tokenId}
                    chain={
                      collectionQuery.data?.mainnet?.network ||
                      collectionQuery.data?.testnet?.network ||
                      'goerli'
                    }
                    contractAddress={
                      collectionQuery.data?.mainnet?.contractAddress ||
                      collectionQuery.data?.testnet?.contractAddress ||
                      ''
                    }
                    id={creation.tokenId}
                    name={creation.title}
                    description={creation.description}
                    contractId={id as string}
                    fileType={creation.rawMetadata.fileType}
                    fileUrl={creation.media[0].gateway}
                    handleClick={() => {
                      router.push(`/collection/${id}/${creation.tokenId}`);
                    }}
                  />
                ))
              )}
            </div>
            <div className="fixed bottom-0 left-0 flex w-full justify-between bg-white px-4">
              <div className="w-0 sm:w-1/2"></div>
              <PickCreationType id={id as string} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
