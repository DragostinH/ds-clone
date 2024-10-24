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
      imageUrl: "aasdasda",
    },
    mode: "onBlur",
  });

  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Create a server</DialogTitle>
          <DialogDescription>{/* <p>Start a new server and invite your friends to join.</p> */}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">img upload</div>
            </div>

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
