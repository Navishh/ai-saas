"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { cn } from "@/lib/utils";
import {
  Check,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
  Zap,
} from "lucide-react";

export const ProModal = () => {
  const proModal = useProModal();

  const tools = [
    {
      label: "Conversation",
      icon: MessageSquare,
      color: "text-violet-500",
      bgcolor: "bg-violet-500/10",
    },
    {
      label: "Image Generation",
      icon: ImageIcon,
      color: "text-pink-500",
      bgcolor: "bg-pink-500/10",
    },
    {
      label: "Music Generation",
      icon: Music,
      color: "text-blue-500",
      bgcolor: "bg-blue-500/10",
    },

    {
      label: "Video Generation",
      icon: VideoIcon,
      color: "text-orange-500",
      bgcolor: "bg-orange-500/10",
    },
    {
      label: "Code Generation",
      icon: Code,
      color: "text-green-500",
      bgcolor: "bg-green-500/10",
    },
  ];

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className=" bg-white">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="gap-x-2 flex flex-row justify-center items-center py-1 font-bold ">
              <p> Upgrade to Alix</p>
              <Badge variant={"premium"} className="uppercase text-sm py-1">
                pro
              </Badge>
            </div>
          </DialogTitle>

          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className="p-3 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgcolor)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                  </div>
                  <div className="font-semibold text-sm"> {tool.label}</div>
                </div>
                <Check className="text-primary w-5 h-5" />
              </Card>
            ))}
            <div className="text-sm pt-5 pb-3">
              {" "}
              Upgrade to premium & gain access to unlimmited ai generations!
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button size={`lg`} variant={`premium`} className="w-full">
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
