"use client";
import * as z from "zod";
import qs from "query-string";
import { Button } from "@/components/ui/button";

import { useModal } from "@/app/hooks/useModalStore";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { TrashIcon } from "lucide-react";

export const DeleteServerModal = () => {
  const { isOpen, onClose, type, onOpen, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const { server } = data;
  const router = useRouter();
  const params = useParams();
  const isModalOpen = isOpen && type === "delete-server";

  const handleDeleteServer = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`/api/server/${server?.id}`);
      if (res.status === 200) {
        toast.success(
          <p>
            You have permanently <span className="text-rose-500">deleted</span> the server <span className="underline font-semibold text-primary-300 cursor-pointer">{server?.name}</span>
          </p>,
          {
            icon: "🗑️",
            duration: 5000,
            style: {
              animation: "ease-in",
              animationDirection: "reverse",
            },
          }
        );
      }
      onClose();
    } catch (error) {
      console.log("[HANDLE_DELETE_SERVER_ERROR]", error);
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
          <DialogTitle className="text-primary-100 text-lg  text-center">Delete server</DialogTitle>
          <DialogDescription>
            Are you sure you want to permanently delete the{" "}
            <span
              className="
              font-bold
              text-primary-200
              underline
              cursor-pointer
              ">
              {server?.name}
            </span>{" "}
            server? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex items-center justify-between w-full gap-4">
            <Button
              isLoading={isLoading}
              onClick={handleDeleteServer}
              className="
                w-1/3
                text-rose-500
                hover:text-rose-600
                focus:text-rose-600
              "
              variant="secondary"
              color="danger">
              <TrashIcon className="w-6 h-6 mr-2" />
              Delete server
            </Button>
            <Button
              onClick={onClose}
              className="w-1/3"
              color="secondary">
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
