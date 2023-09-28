/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import AddSocials from '@/components/cards/AddSocials';
import { useForm } from 'react-hook-form';
import { BACKEND_URL } from '@/utils/env';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { ImagePlus, PlusSquare } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { useAccount } from 'wagmi';
import { z } from 'zod';
import { getProfile } from '@/utils/api';

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  userName: z.string().min(3, 'create ID must be at least 3 characters'),
  email: z.string().email('Invalid email address').optional(),
  walletAddress: z.string(),
});

const create = () => {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { address } = useAccount();
  const router = useRouter();

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(address as string),
    enabled: !!address,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: profileQuery.data,
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div className="pb-12">
      <h1 className="pb-6 text-2xl font-semibold md:pb-8 md:text-3xl">Create Profile</h1>
      <div className="flex flex-col gap-4 px-2 py-6 lg:flex-row lg:items-start xl:gap-8">
        <div
          className={`relative h-[15rem] w-full cursor-pointer rounded-xl bg-muted sm:h-[18rem] lg:h-[70vh] lg:w-1/2 xl:w-2/5 2xl:w-1/3
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
                Drag and drop your image here, or click to select a image
              </p>
            </div>
          )}
          <Input
            type="file"
            className="hidden h-full w-full"
            accept="image/*"
            ref={inputRef}
            onChange={(e) => setFile(e.target.files?.[0] || file || null)}
          />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col justify-center gap-4 sm:px-6 md:px-12 lg:w-1/2 lg:px-0 xl:w-2/5 xl:gap-6 2xl:w-1/3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>UserName</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="userName" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="walletAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Wallet Address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel className="flex items-center gap-2 lg:mt-6">
              <PlusSquare className="h-5 w-5 text-muted-foreground" />
              <AddSocials />
            </FormLabel>
            <div className="fixed bottom-0 left-0 flex w-full justify-between gap-4 bg-white px-4 md:justify-end">
              <Button
                variant={'outline'}
                size={'lg'}
                className=" my-2 w-1/2 md:w-1/3 lg:my-4 lg:w-1/5 xl:w-1/6"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size={'lg'}
                className="my-2 w-1/2 md:w-1/3 lg:my-4 lg:w-1/5 xl:w-1/6"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default create;