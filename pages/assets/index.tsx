import { NftCard } from '@/components/cards';
import { Loader } from '@/components/ui';
import { getAllAssets } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import { useAccount, useNetwork } from 'wagmi';

const Index = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const assetQuery = useQuery({
    queryKey: ['assets'],
    queryFn: () => getAllAssets(address as string, chain?.name || 'goerli'),
  });

  if (assetQuery.isLoading) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <Loader width="80px" height="80px" />
      </div>
    );
  }
  return (
    <div>
      <h1 className="pb-6 text-2xl font-semibold md:text-3xl">Your Assets</h1>
      <div className="grid-col-1 grid gap-2 py-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:gap-6 2xl:grid-cols-4">
        {assetQuery.isLoading ? (
          <div className="mt-20 flex justify-center">
            <Loader />
          </div>
        ) : assetQuery.data && assetQuery.data.length === 0 ? (
          <p className="absolute left-[46%] top-[45%] text-xl font-semibold">No creations found</p>
        ) : (
          assetQuery.data &&
          assetQuery.data.map((creation) => (
            <NftCard
              className="max-w-sm sm:max-w-full"
              key={creation.tokenId}
              chain={chain?.name || 'goerli'}
              id={creation.tokenId}
              name={creation.title}
              description={creation.description}
              fileType={creation.rawMetadata?.fileType || 'image'}
              fileUrl={creation.media[0].gateway}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Index;
