import { MintProgress } from '@/components/cards';
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Loader,
  Textarea,
} from '@/components/ui';
import { toast } from '@/components/ui/use-toast';
import { getCollection } from '@/utils/api';
import { NFT_STORAGE_KEY } from '@/utils/env';
import { zodResolver } from '@hookform/resolvers/zod';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { ChevronLeft, ImagePlus, XSquare } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { File, NFTStorage } from 'nft.storage';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAccount, useNetwork, useSwitchNetwork, useWalletClient } from 'wagmi';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  external_url: z.string().url('Invalid URL'),
  description: z.string().optional(),
});

const Single = () => {
  const router = useRouter();
  const { id } = router.query;
  const { address } = useAccount();
  const { data: signer } = useWalletClient();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { openConnectModal } = useConnectModal();

  const collectionQuery = useQuery({
    queryKey: ['collection', id],
    queryFn: () => getCollection(address as string, id as string),
    enabled: !!id,
  });

  const [metadata, setMetadata] = useState<
    {
      key: string;
      value: string;
    }[]
  >([{ key: '', value: '' }]);
  const [file, setFile] = useState<File | null>(null);
  const [contractNetwork, setContractNetwork] = useState<string>('');
  const [progressModal, setProgressModal] = useState({ open: false, step: 1 });
  const [contractAddress, setContractAddress] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (collectionQuery.data) {
      let str =
        collectionQuery.data.mainnet?.network || collectionQuery.data.testnet?.network || '';
      str = str.charAt(0).toUpperCase() + str.slice(1);
      setContractNetwork(str);
      setContractAddress(
        collectionQuery.data.mainnet?.contractAddress ||
          collectionQuery.data.testnet?.contractAddress ||
          ''
      );
    }
  }, [collectionQuery.data]);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: '',
      external_url: '',
      description: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!address) {
      openConnectModal && openConnectModal();
      toast({ title: 'Please connect your wallet to continue', variant: 'destructive' });
      return;
    }
    if (collectionQuery.error) {
      return;
    }
    // check the network
    if (contractNetwork !== (chain && chain.name)) {
      toast({ title: 'Please switch to the correct network', variant: 'destructive' });
      switchNetwork &&
        switchNetwork(
          contractNetwork === 'Goerli'
            ? 5
            : contractNetwork === 'Matic'
            ? 137
            : contractNetwork === 'Homestead'
            ? 1
            : 10 // optimism
        );
      return;
    }
    if (!file) {
      toast({ title: 'Please upload a file', variant: 'destructive' });
      return;
    }
    setProgressModal({ open: true, step: 1 });

    // handle metadata according to NFT standard
    let metadataNft: {
      trait_type: string;
      value: string;
    }[] = [];
    metadata.forEach((item) => {
      if (item.key && item.value) {
        metadataNft.push({ trait_type: item.key, value: item.value });
      }
    });

    try {
      const storeNFT = async () => {
        const nftStorage = new NFTStorage({ token: NFT_STORAGE_KEY || '' });
        return nftStorage.store({
          name: data.name,
          description: data.description || '',
          external_url: data.external_url,
          fileType: file?.type.split('/')[0],
          attributes: metadataNft,
          image: new File([file as Blob], `${data.name.replace(/[^a-zA-Z]/g, '')}.png`, {
            type: file?.type,
          }),
        });
      };
      const result = await storeNFT();
      if (!result || !signer) return;
      const tokenUri = result.url;

      setProgressModal({ open: true, step: 2 });
      const abi = ['function mintBase(address to, string calldata uri) public returns (uint256)'];
      // const myNftContract = new ethers.Contract(contractAddress, abi, signer);
      // const nftTxn = await myNftContract.mintBase(address, tokenUri);

      setProgressModal({ open: true, step: 3 });
      // await nftTxn.wait();
    } catch (error) {}
  };

  return (
    <div className="pb-12">
      <MintProgress
        open={progressModal.open}
        network={(chain && chain.name) || 'Goerli'}
        step={progressModal.step}
      />
      <div className="flex items-center gap-1">
        <ChevronLeft
          className="h-6 w-6 hover:cursor-pointer"
          onClick={() => router.push(`/collection/${id}`)}
        />
        <h1 className="text-2xl font-semibold md:text-3xl">New Creation</h1>
      </div>
      <div className="flex flex-col gap-4 px-2 py-6 lg:flex-row lg:items-start xl:gap-8">
        <div
          className={`relative h-[15rem] w-full cursor-pointer rounded-xl bg-muted sm:h-[18rem] lg:h-[70vh] lg:w-1/2 xl:w-2/5 2xl:w-1/3
          ${file && 'image-hover-change'}`}
          onClick={() => inputRef.current?.click()}
        >
          {file && file.type.startsWith('image/') ? (
            <Image
              src={URL.createObjectURL(file)}
              className="h-full w-full rounded-xl object-cover"
              alt="Image"
              width="100"
              height="100"
            />
          ) : file && file.type.startsWith('video/') ? (
            <video
              src={URL.createObjectURL(file)}
              className="h-full w-full rounded-xl object-cover"
            />
          ) : file && file.type.startsWith('audio/') ? (
            <audio
              src={URL.createObjectURL(file)}
              className="h-full w-full rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 lg:gap-5">
              <ImagePlus className="h-10 w-10 text-muted-foreground lg:h-16 lg:w-16" />
              <p className="w-3/4 text-center text-muted-foreground lg:w-1/2 lg:text-lg">
                Drag and drop your file here, or click to select a file
              </p>
            </div>
          )}
          <Input
            type="file"
            className="hidden h-full w-full"
            ref={inputRef}
            onChange={(e) => setFile(e.target.files?.[0] || file || null)}
          />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col justify-center gap-4 sm:px-6 md:px-12 lg:w-1/2 lg:gap-6 lg:px-0 xl:w-2/5 xl:gap-6 2xl:w-1/3 2xl:gap-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name of Creation" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="external_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>External URL</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="External URL" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel>Add Metadata</FormLabel>
              <FormDescription>
                Add metadata to your creation to make it more discoverable
              </FormDescription>
              <div className="flex flex-col py-4">
                {metadata?.map((meta, index) => (
                  <div key={meta.key} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Key"
                        value={meta.key}
                        onChange={(e) => {
                          const newMetadata = [...metadata];
                          newMetadata[index].key = e.target.value;
                          setMetadata(newMetadata);
                        }}
                      />
                      <Input
                        placeholder="Value"
                        value={meta.value}
                        onChange={(e) => {
                          const newMetadata = [...metadata];
                          newMetadata[index].value = e.target.value;
                          setMetadata(newMetadata);
                        }}
                      />
                      <XSquare
                        className="h-14 w-14 cursor-pointer text-red-500"
                        onClick={() => {
                          const newMetadata = [...metadata];
                          newMetadata.splice(index, 1);
                          setMetadata(newMetadata);
                        }}
                      />
                    </div>
                  </div>
                ))}
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={() => {
                      const newMetadata = [...metadata];
                      newMetadata.push({ key: '', value: '' });
                      setMetadata(newMetadata);
                    }}
                  >
                    Add Metadata
                  </Button>
                </div>
              </div>
            </div>
            <div className="fixed bottom-0 left-0 flex w-full justify-between gap-4 bg-white px-4 md:justify-end">
              <Button className="my-6 w-1/2 md:w-1/3 lg:my-6 lg:w-1/4 xl:w-1/5" variant={'outline'}>
                Cancel
              </Button>
              <Button
                className="my-6 w-1/2 md:w-1/3 lg:my-6 lg:w-1/4 xl:w-1/5"
                variant={'secondary'}
                type="submit"
                disabled={collectionQuery.isLoading}
              >
                {collectionQuery.isLoading ? (
                  <Loader height="25px" width="25px" />
                ) : chain && contractNetwork !== (chain && chain.name) ? (
                  'Switch Network'
                ) : (
                  'Mint Creation'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Single;
