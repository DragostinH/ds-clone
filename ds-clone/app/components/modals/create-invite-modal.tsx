"use client";

import { useModal } from "@/app/hooks/useModalStore";
import { useOrigin } from "@/app/hooks/useOrigin";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
export const CreateInviteModal = () => {
  const { isOpen, onClose, type, onOpen, data } = useModal();
  const [inviteUrl, setInviteUrl] = useState("");
  const origin = useOrigin();
  const { server } = data;

  if (!server) console.log("[CREATE_INVITE_MODAL_SERVER_NOT_IN_DATA]");

  const isModalOpen = isOpen && type === "invite-member";


  const handleCopy = () => {
    //
    toast.success("Copied invite link to clipboard", {
      icon: "📋",
      id: "copy-invite-link",
    });
    navigator.clipboard.writeText(inviteUrl);
    console.log("Copied to clipboard", inviteUrl);
  };

  const handleGenerateInvite = async () => {
    //
    try {
      const res = await axios.post(`/api/server/invite/${server?.id}/`);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Invite a member</DialogTitle>
          <DialogDescription>Invite a member to your server by entering their email address.</DialogDescription>
        </DialogHeader>

        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Server invite link</Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
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
