import { BatchFileType } from '@/utils/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { XSquare } from 'lucide-react';
import Image from 'next/image';
import { FC, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from '../ui';

interface BatchItemEditProps {
  index: number;
  file: BatchFileType;
  batchFiles: BatchFileType[];
  setBatchFiles: React.Dispatch<React.SetStateAction<BatchFileType[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  externalUrl: z.string().url(),
  description: z.string(),
});

export const BatchItemEdit: FC<BatchItemEditProps> = ({
  index,
  file,
  batchFiles,
  setBatchFiles,
  isOpen,
  setIsOpen,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: file.name,
      externalUrl: file.externalUrl,
      description: file.description,
    },
    resolver: zodResolver(formSchema),
  });

  const [metadata, setMetadata] = useState(file.metadata);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const imageClassNames = 'rounded-xl object-cover w-full h-64 lg:w-1/2 lg:h-[28rem]';

  return (
    <Dialog open={isOpen}>
      <DialogContent manualControl className="w-[95%] rounded-xl lg:max-w-3xl xl:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="self-start text-xl">{file.name.split('.')[0]}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="basics" className="w-full py-2">
          <TabsList className="mb-4 grid grid-cols-2 gap-2">
            <TabsTrigger value="basics">Edit Basics</TabsTrigger>
            <TabsTrigger value="metadata">Edit Metadata</TabsTrigger>
          </TabsList>
          <TabsContent value="basics">
            <div className="flex w-full flex-col gap-6 lg:flex-row">
              {file.type.split('/')[0] === 'video' ? (
                <video
                  autoPlay={true}
                  muted={true}
                  src={file.file as string}
                  className={imageClassNames}
                />
              ) : file.type.split('/')[0] === 'audio' ? (
                <div>
                  <Image
                    src="/Frame-default-img.svg"
                    alt="nft"
                    className={imageClassNames}
                    height={64}
                    width={64}
                  />
                  <audio src={file.file as string} className={imageClassNames} />
                </div>
              ) : (
                <Image
                  src={file.file as string}
                  alt={file.name}
                  className={imageClassNames}
                  height={64}
                  width={64}
                />
              )}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((data) => {
                    const newBatchFiles = [...batchFiles];
                    newBatchFiles[index] = {
                      ...newBatchFiles[index],
                      name: data.name,
                      externalUrl: data.externalUrl,
                      description: data.description,
                      metadata,
                    };
                    setBatchFiles(newBatchFiles);
                    setIsOpen(false);
                  })}
                  className="flex w-full flex-col gap-4 lg:w-1/2"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="externalUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>External URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <button type="submit" className="hidden" ref={submitButtonRef} />
                </form>
              </Form>
            </div>
            <div className="mt-4 flex w-full justify-between gap-4 lg:ml-auto lg:mr-0 lg:w-3/5">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full"
                onClick={() => submitButtonRef.current?.click()}
              >
                Save
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="metadata" className="pt-4">
            <DialogDescription>
              Add metadata to your creation to make it more discoverable
            </DialogDescription>
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
              <div className="mt-4 flex justify-end pb-4">
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
            <DialogFooter className="flex w-full justify-between gap-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full"
                onClick={() => {
                  const newBatchFiles = [...batchFiles];
                  newBatchFiles[index] = {
                    ...newBatchFiles[index],
                    name: form.getValues('name'),
                    externalUrl: form.getValues('externalUrl'),
                    description: form.getValues('description'),
                    metadata,
                  };
                  setBatchFiles(newBatchFiles);
                  setIsOpen(false);
                }}
              >
                Save
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
