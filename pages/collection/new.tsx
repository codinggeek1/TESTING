import ContractDevProgress from '@/components/ContractDevProgress';
import {
  Button,
  Form,
  FormControl,
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
} from '@/components/ui';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';
import { z } from 'zod';

const formSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(50)
    .regex(/^[a-zA-Z]+/, 'Name must start with a letter'),
  symbol: z
    .string()
    .min(3, 'Symbol must be at least 3 characters')
    .max(10)
    .regex(/^[A-Z]+$/, 'Symbol must be all caps'),
  description: z.string().max(200).optional(),
});

const New = () => {
  const [currentStep, setCurrentStep] = useState<'form' | 'features' | 'deployment'>('form');
  const [file, setFile] = useState<File | null>(null);
  const [file64, setFile64] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formSubmitButtonRef = useRef<HTMLButtonElement>(null);
  const [formFocus, setFormFocus] = useState<'name' | 'symbol' | 'description'>('name');

  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: '',
      symbol: '',
      description: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!address) {
      openConnectModal && openConnectModal();
      toast({ title: 'Please connect your wallet to continue', variant: 'destructive' });
      return;
    }
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: 'File size must be less than 5MB', variant: 'destructive' });
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFile64(reader.result as string);
      };
    }
    setCurrentStep('features');
  };

  return (
    <div className="pb-24">
      <div className="flex items-center justify-between pb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold md:text-2xl">New Contract</h1>
          <h1 className="text-lg font-medium md:text-xl">ERC 721</h1>
        </div>
        <Image src="/info-icon.svg" alt="info icon" width={35} height={35} />
      </div>
      <Tabs
        defaultValue="form"
        className="w-full py-2"
        onValueChange={(value) => setCurrentStep(value as any)}
        value={currentStep}
      >
        <TabsList className="mx-auto mb-6 grid grid-cols-3 gap-2 lg:mb-10 lg:w-1/2 2xl:mb-20">
          <TabsTrigger value="form">Details</TabsTrigger>
          <TabsTrigger value="features" disabled={currentStep === 'form'}>
            Features
          </TabsTrigger>
          <TabsTrigger
            value="deployment"
            disabled={currentStep === 'form' || currentStep === 'features'}
          >
            Deployment
          </TabsTrigger>
        </TabsList>
        <TabsContent value="form">
          <div className="flex flex-col gap-4 lg:mx-auto lg:w-[90%] lg:flex-row-reverse lg:items-start lg:justify-center lg:gap-8 xl:gap-12">
            <div className="w-full lg:flex lg:w-1/2 lg:flex-col lg:gap-8 xl:w-2/5 2xl:w-1/3">
              <div
                className={`relative mx-auto h-[14rem] w-full max-w-lg cursor-pointer rounded-xl bg-muted drop-shadow-lg sm:h-[18rem] lg:h-[20rem] lg:max-w-none 
          ${file && 'image-hover-change'}`}
                onClick={() => inputRef.current?.click()}
              >
                {file ? (
                  <Image
                    src={URL.createObjectURL(file)}
                    className="h-full w-full rounded-xl object-cover"
                    alt="Image"
                    width="100"
                    height="100"
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
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || file || null)}
                />
              </div>
              <div className="hidden flex-col gap-2 border-l border-gray-600 py-2 pl-4 lg:flex">
                <h3 className="font-medium">
                  What is a{' '}
                  {formFocus === 'name'
                    ? 'Collection Name'
                    : formFocus === 'symbol'
                    ? 'Symbol'
                    : 'Description'}
                  ?
                </h3>
                <p className="w-3/4 text-sm text-muted-foreground">
                  {formFocus === 'name'
                    ? 'The name given to a bunch of Creations minted together as a collection is known as Collection name.'
                    : formFocus === 'symbol'
                    ? 'A symbol is usually an abbreviation of your collection name often used to represent your NFT collection.'
                    : 'The description is the text that describes an NFT listing, includes information on the NFT and justifies why it’s valuable to buy.'}
                </p>
              </div>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full flex-col justify-center gap-4 sm:px-6 md:px-12 lg:w-1/2 lg:gap-6 lg:px-0 xl:w-2/5 xl:gap-6 2xl:w-1/3"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Name of Collection"
                          onFocus={() => setFormFocus('name')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="symbol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Symbol</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Symbol of Collection"
                          onFocus={() => setFormFocus('symbol')}
                        />
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
                        <Textarea
                          {...field}
                          placeholder="Description of Collection"
                          onFocus={() => setFormFocus('description')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="hidden w-full" type="submit" ref={formSubmitButtonRef}>
                  Create
                </Button>
              </form>
            </Form>
          </div>
        </TabsContent>
        <TabsContent value="features"></TabsContent>
        <TabsContent value="deployment"></TabsContent>
      </Tabs>
      <div className="fixed bottom-0 left-0 flex w-full justify-between gap-4 bg-white px-4 md:justify-end">
        <Button className="my-6 w-1/2 md:w-1/3 lg:my-6 lg:w-1/4 xl:w-1/5" variant={'outline'}>
          Cancel
        </Button>
        <Button
          className="my-6 w-1/2 md:w-1/3 lg:my-6 lg:w-1/4 xl:w-1/5"
          variant={'secondary'}
          onClick={() => currentStep === 'form' && formSubmitButtonRef.current?.click()}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default New;
