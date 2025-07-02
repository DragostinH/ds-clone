"use client";
import * as z from "zod";
import qs from "query-string";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useModal } from "@/app/hooks/useModalStore";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { ChannelType } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Channel name is required",
    })
    .refine((name) => name !== "general", {
      message: "Channel name cannot be 'general'",
    }),

  type: z.nativeEnum(ChannelType),
});

type FormValues = {
  name: string;
};

export const EditChannelModal = () => {
  const { isOpen, onClose, type, onOpen, data } = useModal();
  const { register, handleSubmit } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState(false);

  const { channel } = data;

  const router = useRouter();
  const params = useParams();
  const isModalOpen = isOpen && type === "edit-channel";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: channel?.type || ChannelType.TEXT,
    },
    mode: "onBlur",
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/channel/${channel?.id}`,
        query: {
          serverId: params?.serverId,
        },
      });
      const res = await axios.patch(url, values);
      form.reset();
      if (res.status === 200) {
        toast.success(`Updated the ${values.type} channel: ${values.name}`, {
          icon: "🎉",
          duration: 5000,
        });
      }
      router.refresh();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (channel) {
      form.setValue("type", channel?.type);
      form.setValue("name", channel?.name);
    }
  }, [channel, form, isOpen]);

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={handleClose}>
      <DialogContent className="bg-[#1E1F22] text-black p-4 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-primary-100 text-lg  text-center">
            Edit the <span className="underline font-semibold text-primary-300">{channel?.name}</span> channel
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary-100 text-pretty">Channel Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="border-0 focus-visible:ring-0 text-primary-100 focus-visible:ring-offset-0"
                      placeholder="Enter a channel name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary-100 text-pretty">Channel Type</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none"
                        {...field}>
                        <SelectValue placeholder="Select a channel type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(ChannelType).map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="capitalize">
                          {type.toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                isLoading={isLoading}
                type="submit"
                disabled={isLoading}
                className="w-full"
                variant="primary">
                Update Channel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
