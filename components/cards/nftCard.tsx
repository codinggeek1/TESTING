// import Image from 'next/image';
import router, { useRouter } from 'next/router';
import { FC } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui';

interface NftCardComponentProps {
  name: string;
  id: number | string;
  chain: string;
  description: string;
  fileType: string;
  fileUrl: string;
  handleClick?: () => void;
  contractAddress?: string;
  contractId?: string;
  className?: string;
}

export const NftCard: FC<NftCardComponentProps> = ({
  name,
  id,
  chain,
  description,
  fileType,
  fileUrl,
  handleClick,
  contractAddress,
  contractId,
  className,
}) => {
  const router = useRouter();
  return (
    <Card className={className}>
      {fileType === 'image' ? (
        <img
          src={fileUrl}
          alt={name}
          className="h-[10rem] w-full rounded-t-xl object-cover lg:h-[12rem]"
        />
      ) : fileType === 'video' ? (
        <video src={fileUrl} className="h-[10rem] w-full rounded-t-xl object-cover lg:h-[12rem]" />
      ) : (
        <audio src={fileUrl} className="h-[10rem] w-full rounded-t-xl object-cover lg:h-[12rem]" />
      )}
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            {name} | #{id}
          </CardTitle>
          <p className="rounded-lg bg-secondary px-3 py-1 text-sm text-white">{chain}</p>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="py-2">
          {description.length > 100 ? description.slice(0, 100) + '...' : description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-3">
        <Button
          variant="outline"
          className="w-1/2"
          onClick={() => {
            router.push(`/collection/${contractId}/creation/${id}`);
          }}
        >
          Details
        </Button>
        <Button
          className="w-1/2"
          onClick={() => router.push(`/collection/${contractId}/creation/${id}/list`)}
        >
          List
        </Button>
      </CardFooter>
    </Card>
  );
};
