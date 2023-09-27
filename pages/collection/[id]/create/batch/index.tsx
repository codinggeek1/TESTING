import { BatchItemEdit, BatchItemShowcase } from '@/components/batch';
import { Button } from '@/components/ui';
import { toast } from '@/components/ui/use-toast';
import { createBatch } from '@/utils/api';
import { batchMintBasicDataState } from '@/utils/atom';
import { NFT_STORAGE_KEY } from '@/utils/env';
import fileToBase64 from '@/utils/fileToBase64';
import { BackendFile, BatchFileType } from '@/utils/types';
import { useMutation } from '@tanstack/react-query';
import { ChevronLeft, ImagePlus, Upload } from 'lucide-react';
import { useRouter } from 'next/router';
import { NFTStorage } from 'nft.storage';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useAccount } from 'wagmi';

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const { address } = useAccount();

  const batchBasicData = useRecoilValue(batchMintBasicDataState);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [nftIndex, setNftIndex] = useState(1);
  const [batchFiles, setBatchFiles] = useState<BatchFileType[]>([]);
  const [isBatchEditModalOpen, setIsBatchEditModalOpen] = useState(false);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      toast({ title: 'No files selected', variant: 'destructive' });
      return;
    }
    const files = Array.from(e.target.files);
    files.forEach(async (file, index) => {
      const fileFormat = file.name.split('.').pop();
      if (
        !fileFormat ||
        !['jpg', 'jpeg', 'png', 'webp', 'mp4', 'webm', 'gif'].includes(fileFormat)
      ) {
        toast({ title: 'Invalid file format', variant: 'destructive' });
        return;
      }
      const modifiedFile = new File(
        [file],
        `${batchBasicData.name + ' #' + (nftIndex + index)}.${fileFormat}`,
        { type: file.type }
      );
      const newFile: BatchFileType = {
        name: modifiedFile.name.split('.')[0],
        type: modifiedFile.type,
        format: fileFormat,
        file: (await fileToBase64(modifiedFile)) as string,
        description: batchBasicData.description,
        externalUrl: batchBasicData.externalUrl,
        metadata: [{ key: '', value: '' }],
      };
      setBatchFiles((prev) => [...prev, newFile]);
      setNftIndex((prev) => prev + 1);
    });
  };

  const postBatchMutation = useMutation({
    mutationFn: (data: BackendFile[]) =>
      createBatch(address as string, {
        batchName: batchBasicData.name,
        description: batchBasicData.description,
        contractId: id as string,
        createdBy: batchBasicData.createdBy,
        files: data,
      }),
    onSuccess: () => {
      toast({ title: 'Batch created' });
    },
  });

  const finalizeBatch = async () => {
    if (batchFiles.length === 0) {
      toast({ title: 'No files added', variant: 'destructive' });
      return;
    }
    const fileData: BackendFile[] = [];

    const promises = batchFiles.map(async (file, index) => {
      let metadataNft: {
        trait_type: string;
        value: string;
      }[] = [];
      file.metadata.forEach((data) => {
        if (data.key !== '' && data.value !== '') {
          metadataNft.push({
            trait_type: data.key,
            value: data.value,
          });
        }
      });

      try {
        const storeNFT = async () => {
          const nftStorage = new NFTStorage({ token: NFT_STORAGE_KEY || '' });
          return nftStorage.store({
            name: file.name,
            description: file.description || '',
            external_url: file.externalUrl,
            fileType: file.type.split('/')[0],
            attributes: metadataNft,
            image: new File([file.file], `${file.name.replace(/[^a-zA-Z]/g, '')}.png`, {
              type: file?.type,
            }),
          });
        };
        const result = await storeNFT();
        if (result) {
          fileData.push({
            name: file.name,
            description: file.description || '',
            externalUrl: file.externalUrl,
            imageLink: result.data.image as unknown as string,
            ipfsLink: result.ipnft,
            metadata: metadataNft,
          });
        }
      } catch (error) {
        toast({ title: `Error storing NFT - ${file.name}`, variant: 'destructive' });
      }
    });
    await Promise.all(promises);
    postBatchMutation.mutate(fileData);
  };

  useEffect(() => {
    if (batchBasicData.name === '' && id) {
      router.push(`/collection/${id}`);
    }
  }, [id]);

  return (
    <div className="pb-12">
      {isBatchEditModalOpen && (
        <BatchItemEdit
          file={batchFiles[selectedFileIndex]}
          setIsOpen={setIsBatchEditModalOpen}
          isOpen={isBatchEditModalOpen}
          batchFiles={batchFiles}
          setBatchFiles={setBatchFiles}
          index={selectedFileIndex}
        />
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <ChevronLeft
            className="h-6 w-6 hover:cursor-pointer"
            onClick={() => router.push(`/collection/${id}`)}
          />
          <h1 className="text-2xl font-semibold md:text-3xl">{batchBasicData.name}</h1>
        </div>
        {batchFiles.length > 0 && (
          <div
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-muted px-3 py-2 text-muted-foreground"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-5 w-5" />
            <p className="text-sm">Add files</p>
            <input
              className="hidden"
              type="file"
              multiple
              accept="image/*, video/*, audio/*"
              ref={fileInputRef}
              onChange={handleFileInput}
            />
          </div>
        )}
      </div>
      {batchFiles.length > 0 ? (
        <div className="mx-auto mt-6 grid w-[90%] grid-cols-1 gap-4 pb-10 sm:grid-cols-2 sm:gap-7 md:mx-0 md:ml-8 lg:mt-10 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4 2xl:grid-cols-5">
          {batchFiles.map((file, index) => (
            <BatchItemShowcase
              key={index}
              index={index}
              file={file.file as string}
              fileFormat={file.format}
              fileType={file.type.split('/')[0]}
              filename={file.name}
              handleSingleFileDelete={() => {
                setBatchFiles((prev) => prev.filter((_, i) => i !== index));
                setNftIndex((prev) => prev - 1);
              }}
              onClick={() => {
                setSelectedFileIndex(index);
                setIsBatchEditModalOpen(true);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="relative mx-auto mt-20 h-[15rem] w-full cursor-pointer rounded-xl bg-muted drop-shadow-lg sm:h-[18rem] sm:w-4/5 lg:h-[20rem] lg:w-3/4 xl:h-[24rem] xl:w-1/2 2xl:w-2/5">
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 lg:gap-5">
            <ImagePlus className="h-10 w-10 text-muted-foreground lg:h-16 lg:w-16" />
            <p className="w-3/4 text-center text-muted-foreground lg:w-1/2 lg:text-lg">
              Drag and drop your files here, or click to select your files
            </p>
          </div>
          <input
            className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
            type="file"
            multiple
            accept="image/*, video/*, audio/*"
            ref={fileInputRef}
            onChange={handleFileInput}
          />
        </div>
      )}
      <div className="fixed bottom-0 left-0 flex w-full justify-between gap-4 bg-white px-4 md:justify-end">
        <Button className="my-6 w-1/2 md:w-1/3 lg:my-6 lg:w-1/4 xl:w-1/5" variant={'outline'}>
          Cancel
        </Button>
        <Button
          className="my-6 w-1/2 md:w-1/3 lg:my-6 lg:w-1/4 xl:w-1/5"
          variant={'secondary'}
          type="submit"
          onClick={finalizeBatch}
        >
          {postBatchMutation.isLoading ? 'Finalizing...' : 'Finalize Batch'}
        </Button>
      </div>
    </div>
  );
};

export default Index;
