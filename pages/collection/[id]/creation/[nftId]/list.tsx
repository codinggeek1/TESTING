import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  FormLabel,
  Input,
} from '@/components/ui';
import { Switch } from '@/components/ui/switch';
import { CheckCircle, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

const List = () => {
  const router = useRouter();
  const { nftId, id } = router.query;

  const [opensea, setOpensea] = useState(false);
  const [looksRare, setLooksRare] = useState(false);
  const [rarible, setRarible] = useState(false);
  const [x2y2, setX2y2] = useState(false);
  const [blur, setBlur] = useState(false);

  const marketplaces = [
    {
      name: 'Opensea',
      state: opensea,
      setState: setOpensea,
      logo: '/openseaImg.svg',
    },
    {
      name: 'Looks Rare',
      state: looksRare,
      setState: setLooksRare,
      logo: '/looksrareImg.svg',
    },
    {
      name: 'Rarible',
      state: rarible,
      setState: setRarible,
      logo: '/raribleImg.svg',
    },
    {
      name: 'X2Y2',
      state: x2y2,
      setState: setX2y2,
      logo: '/x2y2Img.svg',
    },
    {
      name: 'Blur',
      state: blur,
      setState: setBlur,
      logo: '/blurImg.png',
    },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center gap-1">
        <ChevronLeft
          className="h-6 w-6 hover:cursor-pointer"
          onClick={() => router.push(`/collection/${id}/creation/${nftId}`)}
        />
        <h1 className="text-2xl font-semibold md:text-3xl">List on Marketplace</h1>
      </div>
      <div className="flex flex-col gap-4 py-4 lg:gap-6">
        <div className="flex flex-col gap-2 md:w-3/5 xl:w-1/2 2xl:w-1/3">
          <p className="sm:text-lg sm:font-medium lg:text-xl">Listing Price</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-muted px-3 py-2">
              <Image src="/ethSymbol.svg" alt="eth" height={54} width={54} />
              {/* <p>ETH</p> */}
            </div>
            <Input className="w-full" placeholder="Amount" />
          </div>
        </div>
        <Card className="md:w-3/5 xl:w-1/2 2xl:w-1/3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <p className="text-lg">Royalties</p>
              <Switch />
            </div>
            <CardDescription className="pt-1 lg:w-4/5">
              Royalties give artists a portion of the proceeds each time their creation is resold.
              Using this feature, you can split royalties by creating a multi-signature wallet.
            </CardDescription>
          </CardHeader>
        </Card>
        <div className="py-2 pb-12">
          <h2 className="text-lg font-medium lg:text-xl">Select Marketplaces to list on:</h2>
          <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3 2xl:gap-8 [&>*]:cursor-pointer">
            {marketplaces.map((marketplace) => (
              <Card
                key={marketplace.name}
                className={`${marketplace.state && 'border-2 border-secondary'}`}
                onClick={() => marketplace.setState(!marketplace.state)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Image
                      height={32}
                      width={32}
                      src={marketplace.logo}
                      alt="opensea"
                      className="h-10 w-32"
                    />
                    <div
                      className={`h-5 w-5 rounded-full bg-muted ${
                        marketplace.state && 'bg-secondary'
                      }`}
                    >
                      {marketplace.state && <CheckCircle className="h-5 w-5 text-white" />}
                    </div>
                  </div>
                  <CardDescription className="pt-1 lg:w-4/5">
                    Publish your Creation on {marketplace.name}, one of the leading NFT marketplace
                    and get more visibility for your collection across the globe.
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
        <div className="fixed bottom-0 left-0 flex w-full justify-between bg-white px-4">
          <div className="w-0 sm:w-1/2"></div>
          <Button
            variant="secondary"
            size={'lg'}
            className="my-6 w-1/2 lg:w-1/3 lg:text-lg 2xl:w-1/4"
          >
            List
          </Button>
        </div>
      </div>
    </div>
  );
};

export default List;
