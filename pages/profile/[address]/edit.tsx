// import {
//   Button,
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
//   Input,
// } from '@/components/ui';
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
import { getProfile, updateProfile } from '@/utils/api';
import fileToBase64 from '@/utils/fileToBase64';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  discord: z.string().optional(),
  profileImage: z.string().optional(),
  // walletAddress: z.string(),
});

const Edit = () => {
  const { address } = useAccount();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // const updateQuery = useQuery({
  //   queryKey: ['update'],
  //   queryFn: () => updateProfile(profile),

  // })

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(address as string),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: profileQuery.data,
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    alert(JSON.stringify(data, null, 2));
  };

  useEffect(() => {
    if (!profileQuery.data) {
      router.push(`/profile/`);
    }
  }, [profileQuery.data]);

  if (!profileQuery.data) {
    return;
  }
  return (
    <div>
      <h1 className="pb-6 text-2xl font-semibold md:pb-10 md:text-3xl">Your Profile</h1>
      <div className="flex flex-col justify-center gap-10 px-2 py-2 sm:px-8 lg:flex-row lg:items-start lg:justify-start">
        <div
          className={`relative h-[15rem] w-full cursor-pointer rounded-xl bg-muted sm:h-[18rem] lg:h-[60vh] lg:w-1/2 xl:w-2/5 2xl:w-1/4
          ${form.getValues('profileImage')?.length && 'image-hover-change'}`}
          onClick={() => inputRef.current?.click()}
        >
          {form.getValues('profileImage')?.length ? (
            <Image
              src={form.getValues('profileImage') || '/profile-center.svg'}
              width={250}
              height={250}
              alt="Profile"
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
            accept="image/png, image/jpeg, image/jpg"
            onChange={async (e) => {
              form.setValue(
                'profileImage',
                // @ts-ignore
                ((await fileToBase64(e.target.files?.[0])) as string) ||
                  form.getValues('profileImage')
              );
              form.trigger('profileImage');
            }}
          />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col justify-center gap-4 sm:px-6 md:px-12 lg:px-0 xl:w-2/5 xl:gap-6"
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Username" />
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
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Instagram" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Twitter" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discord"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discord</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Discord" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="walletAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Wallet Address" disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <div className="flex justify-between gap-4 lg:mt-10">
              <Button variant={'outline'} size={'lg'} className="w-full">
                Cancel
              </Button>
              <Button type="submit" variant={'secondary'} size={'lg'} className="w-full">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Edit;
