"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Plus, Smile } from "lucide-react";
import qs from "query-string";
import { useForm } from "react-hook-form";

import * as z from "zod";

const formSchema = z.object({
  content: z.string().min(1),
});
interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "channel" | "conversation";
}

const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });

      await axios.post(url, value);
    } catch (error) {
      console.log("[ChatInput] error:", error);

      console.error(error);
    }
  };
  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative p-4 pb-6">
                    <Button
                      type="button"
                      onClick={() => {
                        console.log("clicked");
                      }}
                      className="absolute top-7 left-8 h-6 w-6 bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center">
                      <Plus className="text-white dark:text-[#313338]" />
                    </Button>
                    <Input
                      disabled={isLoading}
                      placeholder={`Message #${name}`}
                      className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                      {...field}
                    />
                    <div className="absolute top-7 right-8">
                      <Smile />
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}></FormField>
        </form>
      </Form>
    </div>
  );
};

export default ChatInput;
