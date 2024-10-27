"use client";

import { useModal } from "@/app/hooks/useModalStore";
import { useOrigin } from "@/app/hooks/useOrigin";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Copy, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CreateInviteModal = () => {
  const { isOpen, onClose, type, onOpen, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [inviteUrl, setInviteUrl] = useState("");
  const origin = useOrigin();
  const { server } = data;

  const isModalOpen = isOpen && type === "invite-member";
  // on open, generate invite link

  useEffect(() => {
    if (isModalOpen) {
      handleGenerateInvite();
    }
  }, [isModalOpen]);

  const handleCopy = () => {
    if (inviteUrl === "") {
      toast.success("Invite link is empty", {
        icon: "🚫",
        id: "empty-invite-link",
      });

      return;
    }
    toast.success("Copied invite link to clipboard", {
      icon: "📋",
      id: "copy-invite-link",
    });
    navigator.clipboard.writeText(inviteUrl);
    console.log("Copied to clipboard", inviteUrl);
  };

  const handleGenerateInvite = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`/api/server/invite/${server?.id}/`, {});
      setInviteUrl(data.data.link);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-6 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Create Server Invite</DialogTitle>
          <DialogDescription>Create an invite and bring your friends over to your server.</DialogDescription>
        </DialogHeader>

        <div className="">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Server invite link</Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              readOnly
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button
              onClick={handleCopy}
              size="icon">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            onClick={handleGenerateInvite}
            variant="link"
            className="
            mt-6
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            w-full
            ">
            Generate a new invite link
            <RefreshCw className="w-4 h-4 mr-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
