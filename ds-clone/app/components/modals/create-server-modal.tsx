"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useModal } from "@/app/hooks/useModalStore";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { useRouter } from "next/navigation";
import axios from "axios";
import FileUpload from "../FileUpload";
import { Progress } from "@/components/ui/progress";
import toast from "react-hot-toast";
import { useState } from "react";

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
  thumbnailUrl: z.string().min(1, {
    message: "Server thumbnail is required",
  }),
});

type FormValues = {
  name: string;
  imageUrl: string;
  thumbnailUrl: string;
};

export const CreateServerModal = () => {
  const { isOpen, onClose, type, onOpen } = useModal();
  const { register, handleSubmit } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const isModalOpen = isOpen && type === "create-server";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      thumbnailUrl: "",
    },
    mode: "onBlur",
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit: SubmitHandler<FormValues> = async () => {
    const { imageUrl, name } = form.getValues();
    if (imageUrl === "") {
      toast.error("Please upload an image", {
        icon: "🖼️",
        id: "upload-server-image",
        duration: 5000,
      });
    }

    if (imageUrl.length > 255) {
      toast.error("File name should be less than 255 characters", {
        icon: "🚫",
        id: "server-name-length",
        duration: 5000,
      });
    }

    if (typeof imageUrl === "string" && imageUrl.length > 0 && imageUrl.length <= 255) {
      try {
        setIsLoading(true);
        form.setValue("thumbnailUrl", imageUrl.replace(".jpg", "-thumb.jpg"));

        const res = await axios.post("/api/server", form.getValues());
        if (res?.status === 200) {
          toast.success(
            <p>
              Server <span className="text-primary-300 underline font-semibold cursor-pointer">{name}</span> created successfully!
            </p>,
            {
              icon: "🎉",
              duration: 5000,
            }
          );
        }
        onClose();
        router.push(`/servers/${res.data?.data.id}`);
      } catch (error) {
        console.error(error);
      } finally {
        form.reset();
        setIsLoading(false);
        router.refresh();
      }
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={handleClose}>
      <DialogContent className="bg-[#1E1F22] text-black p-4 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-primary-100 text-lg  text-center">Create a server</DialogTitle>
          <DialogDescription>{/* <p>Start a new server and invite your friends to join.</p> */}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8">
            <div className="flex flex-col items-center justify-center text-center">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary-100 text-pretty">Server Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-primary-100 focus-visible:ring-offset-0"
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
                isLoading={isLoading}
                type="submit"
                disabled={isLoading}
                className="w-full"
                variant="primary">
                Create Server
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
