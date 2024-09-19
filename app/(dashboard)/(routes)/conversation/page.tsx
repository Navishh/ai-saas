// "use client";

// import { Heading } from "@/components/customComponents/heading";
// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import { MessageSquare } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { ChatCompletionRequestMessage } from "openai";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { formSchema } from "./constants";

// const ConversationPage = () => {
//   const router = useRouter();
//   const [messages, setMessages] = useState<ChatCompletionRequestMessage>([]);
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       prompt: "",
//     },
//   });

//   const isLoading = form.formState.isSubmitting;

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       const userMessage: ChatCompletionRequestMessage = {
//         role: "user",
//         content: values.prompt,
//       };
//       const newMessages = [...messages, userMessage];

//       const response = await axios.post("/api/conversation", {
//         messages: newMessages,
//       });

//       setMessages((current) => [...current, userMessage, response.data]);

//       form.reset();
//     } catch (error) {
//     } finally {
//       router.refresh();
//     }
//   };

//   return (
//     <div>
//       <Heading
//         title="Conversation"
//         description="Our most advanced conversation model"
//         icon={MessageSquare}
//         iconColor="text-violet-500"
//         bgColor="bg-violet-500/10"
//       />
//       <div className="px-4 lg:px-8 mt-4">
//         <div>
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
//             >
//               <FormField
//                 name="Prompt"
//                 render={({ field }) => (
//                   <FormItem className="col-span-12 lg:col-span-10">
//                     <FormControl className="m-0 p-0">
//                       <Input
//                         className=" border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
//                         disabled={isLoading}
//                         placeholder="How to calculate the area of a circle?"
//                         {...field}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <Button
//                 className="col-span-12 lg:col-span-2 w-full h-full"
//                 disabled={isLoading}
//               >
//                 Generate
//               </Button>
//             </form>
//           </Form>
//         </div>
//         <div className="space-y-4 mt-4">
//           <div className="flex flex-col-reverse gap-y-4">
//             {messages.map((message) => (
//               <div key={message.content}>{message.content}</div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConversationPage;

"use client";

import { BotAvatar } from "@/components/customComponents/avatar/bot-avatar";
import { UserAvatar } from "@/components/customComponents/avatar/user-avatar";
import { Empty } from "@/components/customComponents/empty";
import { Heading } from "@/components/customComponents/heading";
import { Loader } from "@/components/customComponents/loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatCompletionMessage } from "openai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";

const ConversationPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessage[]>([]); // Corrected the type
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionMessage = {
        // Corrected the type
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
      ]); // Adjusted to response data structure

      form.reset();
    } catch (error) {
      console.error(error); // Added error logging for better debugging
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
                name="prompt" // Corrected the name to match the form field name
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
          {true && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label=" No conversation has started yet" />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "p-8 w-full flex item-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted "
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p>{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
