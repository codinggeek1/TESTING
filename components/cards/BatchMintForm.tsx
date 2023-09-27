import { batchMintBasicDataState } from '@/utils/atom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { FC, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { z } from 'zod';
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
  Textarea,
} from '../ui';

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  createdBy: z.string(),
  externalUrl: z.string().url(),
  description: z.string(),
});

export const BatchMintForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const [formState, setFormState] = useRecoilState(batchMintBasicDataState);
  const formButtonRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: formState.name,
      createdBy: formState.createdBy,
      externalUrl: formState.externalUrl,
      description: formState.description,
    },
    resolver: zodResolver(formSchema),
  });
  return (
    <Dialog>
      <DialogTrigger>
        <Button size={'lg'} variant={'outline'} className="w-fit self-center">
          Continue
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95%] rounded-xl">
        <DialogHeader>
          <DialogTitle className="self-start text-xl">Create New Batch</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              setFormState(data);
              router.push(`/collection/${id}/create/batch`);
            })}
            className="flex w-full flex-col gap-4 p-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name of Batch" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="createdBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Created By</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Creator Name" />
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
            <button type="submit" className="hidden" ref={formButtonRef} />
          </form>
        </Form>
        <DialogFooter className="flex flex-row items-center justify-between gap-3">
          <Button size={'lg'} variant={'outline'} className="w-1/2">
            Cancel
          </Button>
          <Button
            size={'lg'}
            className="w-1/2"
            variant={'secondary'}
            onClick={() => formButtonRef.current?.click()}
          >
            Create a Batch
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
