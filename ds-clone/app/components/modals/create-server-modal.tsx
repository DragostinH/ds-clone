"use client";

import { useModal } from "@/app/hooks/useModalStore";
import { Dialog, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export const CreateServerModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();

  const onSubmit = async () => {};

  return <Dialog></Dialog>;
};
