"use client";

import { Empty } from "@/components/customComponents/empty";
import { Heading } from "@/components/customComponents/heading";
import { Loader } from "@/components/customComponents/loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useProModal } from "@/hooks/use-pro-modal";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";

interface CustomChatCompletionMessage {
  role: "user" | "system";
  content: string;
}

const ConversationPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<CustomChatCompletionMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // try {
    //   const userMessage: CustomChatCompletionMessage = {
    //     role: "user",
    //     content: values.prompt,
    //   };
    //   const newMessages = [...messages, userMessage];

    //   const response = await axios.post("/api/conversation", {
    //     messages: newMessages,
    //   });

    //   setMessages((current) => [
    //     ...current,
    //     userMessage,
    //     response.data.message,
    //   ]);

    //   form.reset();
    // } catch (error: any) {
    //   if (error?.response?.status === 403) {
    //     proModal.onOpen();
    //   }
    // } finally {
    //   router.refresh();
    // }
    try {
      const userMessage: CustomChatCompletionMessage = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      setMessages((current) => [
        ...current,
        userMessage,
        response.data.message,
      ]);

      form.reset();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 403) {
          proModal.onOpen();
        } else {
          console.error(
            "API error:",
            axiosError.response?.data || axiosError.message
          );
        }
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8 mt-4">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="How to calculate the area of a circle?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full h-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label=" No conversation has started yet" />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted "
                )}
              >
                {message.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
