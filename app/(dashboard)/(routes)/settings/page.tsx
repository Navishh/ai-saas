"use client";

import { Heading } from "@/components/customComponents/heading";
import { Settings } from "lucide-react";

// interface CustomChatCompletionMessage {
//   role: "user" | "system";
//   content: string;
// }

const SettingsPage = () => {
  //   const router = useRouter();
  //   const proModal = useProModal();
  //   const [messages, setMessages] = useState<CustomChatCompletionMessage[]>([]);
  //   const form = useForm<z.infer<typeof formSchema>>({
  //     resolver: zodResolver(formSchema),
  //     defaultValues: {
  //       prompt: "",
  //     },
  //   });

  // const isLoading = form.formState.isSubmitting;

  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
  // try {
  //   const userMessage: CustomChatCompletionMessage = {
  //     role: "user",
  //     content: values.prompt,
  //   };
  //   const newMessages = [...messages, userMessage];
  //   const response = await axios.post("/api/settings", {
  //     messages: newMessages,
  //   });
  //   setMessages((current) => [
  //     ...current,
  //     userMessage,
  //     response.data.message,
  //   ]);
  //   form.reset();
  // } catch (error: unknown) {
  //   if (axios.isAxiosError(error)) {
  //     const axiosError = error as AxiosError;
  //     if (axiosError.response?.status === 403) {
  //       proModal.onOpen();
  //     } else {
  //       console.error(
  //         "API error:",
  //         axiosError.response?.data || axiosError.message
  //       );
  //     }
  //   } else {
  //     console.error("Unexpected error:", error);
  //   }
  // } finally {
  //   router.refresh();
  // }
  // };

  return (
    <div>
      <Heading
        title="Settings"
        description=""
        icon={Settings}
        iconColor="text-slate-300"
        bgColor="bg-slate-700"
      />
      <div className="px-4 lg:px-8 mt-4">
        <div></div>
      </div>
    </div>
  );
};

export default SettingsPage;
