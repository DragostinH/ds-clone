"use client";

import { useModal } from "@/app/hooks/useModalStore";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required",
  }),
  imageUrl: z
    .string()
    .min(1, {
      message: "Server image is required",
    })
    .max(255, {
      message: "File name should be less than 255 characters",
    }),
});

export const ServerSettingsModal = () => {
  const { isOpen, onClose, type, onOpen, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "server-settings";
  const { server } = data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  // useEffect(() => {
  //   if (server) {
  //     form.setValue("name", server.name);
  //     form.setValue("imageUrl", server.imageUrl ?? "");
  //   }
  // }, [server]);

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/server/${server?.id}`, values);
      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-4 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-center">Change the server name and/or image.</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server Image</FormLabel>
                  <FormControl>
                    <div className=""></div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      placeholder="Enter a server name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
                variant="secondary">
                Update Server
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
