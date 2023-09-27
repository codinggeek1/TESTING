import { CollectionShowcaseProps } from '@/utils/types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';

const CollectionShowcase: FC<CollectionShowcaseProps> = ({
  id,
  name,
  network,
  status,
  symbol,
  type,
  description,
  image,
}) => {
  const router = useRouter();

  return (
    <div
      className={
        status !== 0
          ? 'cursor-pointer  transition-all duration-200 hover:scale-[1.01]'
          : 'cursor-default'
      }
      onClick={() => {
        status !== 0 && router.push(`/collection/${id}`);
      }}
    >
      <div className="flex h-full justify-between rounded-[14px_52px_12px_12px] bg-muted">
        <Image
          src={image || '/collection-p-3.png'}
          width={100}
          height={100}
          alt="NFT"
          className="h-40 w-[30%] rounded-[14px_34px_14px_14px] object-cover lg:h-[15rem] lg:w-[28%] lg:p-2"
        />
        <div className="flex w-[68%] flex-col justify-between py-4 pl-0 pr-6 lg:w-[70%] lg:pl-2">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-semibold">{name}</p>
            <p className="rounded-[45px] bg-secondary px-4 py-1 text-xs font-medium text-white lg:px-5 lg:py-2">
              {network || 'Draft'}
            </p>
          </div>
          <p className="mb-3 text-xs lg:text-sm">
            {description && description.length > 100
              ? description?.slice(0, 100) + '...'
              : description || 'No description provided'}
          </p>
          <div className="flex justify-between px-3 py-1 lg:py-4">
            <div className="flex flex-col items-center text-xs font-medium">
              <p className="mb-2 text-xs font-bold lg:text-sm">{symbol}</p>
              <p>Symbol</p>
            </div>
            <div className="flex flex-col items-center border-l border-black text-xs font-medium"></div>
            <div className="flex flex-col items-center text-xs font-medium">
              <p className="mb-2 text-xs font-bold lg:text-sm">ERC721</p>
              <p>Type</p>
            </div>
            <div className="flex flex-col items-center border-l border-black text-xs font-medium"></div>
            <div className="flex flex-col items-center text-xs font-medium">
              <p className="mb-2 text-xs font-bold lg:text-sm">{status === 0 ? 'Draft' : 'Live'}</p>
              <p>Status</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionShowcase;
