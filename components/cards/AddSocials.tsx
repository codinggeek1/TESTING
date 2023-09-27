import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { getProfile } from '@/utils/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';
import { z } from 'zod';

interface addSocialsprops {
  open: boolean;
  name: string;
}

const formSchema = z.object({
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  discord: z.string().optional(),
});

const AddSocials = () => {
  const { address } = useAccount();

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(address as string),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      instagram: profileQuery.data?.socials?.instagram ?? '',
      twitter: profileQuery.data?.socials?.twitter ?? '',
      discord: profileQuery.data?.socials?.discord ?? '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <p className="font-medium">Add Socials</p>
      </DialogTrigger>
      <DialogContent className="w-[95%] rounded-xl lg:max-w-[30rem] xl:max-w-[33rem]">
        <DialogHeader>
          <DialogTitle className="self-start text-xl">Add socials</DialogTitle>
        </DialogHeader>
        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col justify-center gap-4 sm:px-6 md:px-12 lg:px-0  xl:gap-6"
            >
              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="instagram" />
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
              <div className="flex justify-between gap-4">
                <DialogTrigger className="w-1/2">
                  <Button variant={'outline'} size={'lg'} className="w-full">
                    Cancel
                  </Button>
                </DialogTrigger>
                <Button type="submit" variant={'secondary'} size={'lg'} className="w-1/2">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSocials;
