"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useModal } from "@/app/hooks/useModalStore";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { useRouter } from "next/navigation";
import axios from "axios";
import FileUpload from "../FileUpload";
import { Progress } from "@/components/ui/progress";

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

export const CreateServerModal = () => {
  const { isOpen, onClose, type, onOpen } = useModal();
  const router = useRouter();
  const isModalOpen = isOpen && type === "create-server";
  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/server", values);
      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.error(error);
    }
    console.log(values);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
    mode: "onBlur",
  });

  const isLoading = form.formState.isSubmitting;

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
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8">
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-white">Server Image</p>
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
// <Dialog open={isOpen}>
//   <DialogContent className="bg-white text-black p0 overflow-hidden">
//     <DialogHeader>
//       <DialogTitle>Create a server</DialogTitle>
//       <DialogDescription>
//         <p>Start a new server and invite your friends to join.</p>
//       </DialogDescription>
//     </DialogHeader>
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)}>
//     </Form>
//   </DialogContent>
// </Dialog>
