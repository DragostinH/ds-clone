"use client";
import * as z from "zod";
import qs from "query-string";
import { Button } from "@/components/ui/button";

import { useModal } from "@/app/hooks/useModalStore";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { redirect, useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { ArrowDownLeftSquare, ArrowLeftSquare } from "lucide-react";

export const LeaverServerModal = () => {
  const { isOpen, onClose, type, onOpen, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const { server } = data;
  const router = useRouter();
  const params = useParams();
  const isModalOpen = isOpen && type === "leave-server";

  const handleLeaveServer = async () => {
    try {
      setIsLoading(true);
      const res = await axios.patch(`/api/server/${server?.id}/leave`);
      if (res.status === 200) {
        toast.success(`You have left the ${server?.name} server`, {
          icon: "👋",
          duration: 5000,
        });
      }
      onClose();
    } catch (error) {
      console.log("[HANDLE_LEAVE_SERVER_ERROR]", error);
    } finally {
      setIsLoading(false);
      router.push("/messages");
      router.refresh();
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={onClose}>
      <DialogContent className="bg-[#1E1F22] text-black p-4 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-primary-100 text-lg  text-center">Leave Server</DialogTitle>
          <DialogDescription>
            Are you sure you want to leave the
            <span
              className="
              font-bold
              text-primary-200
              underline
              cursor-pointer
              ">
              {server?.name}
            </span>{" "}
            server?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex items-center justify-between w-full gap-4">
            <Button
              className="w-1/3"
              isLoading={isLoading}
              variant="secondary"
              onClick={handleLeaveServer}>
              <ArrowLeftSquare className="w-6 h-6" />
              Leave
            </Button>
            <Button
              className="w-1/3"
              onClick={onClose}
              color="secondary">
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
