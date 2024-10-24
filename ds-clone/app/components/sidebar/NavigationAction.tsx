"use client";

import { Plus } from "lucide-react";
import ActionTooltip from "../ActionTooltip";
import { useModal } from "@/app/hooks/useModalStore";

const NavigationAction = () => {
  const { isOpen, onClose, type, onOpen } = useModal();

  const handleOpen = () => {
    onOpen("create-server");
  };
  return (
    <ActionTooltip
      side="right"
      align="center"
      label="add a server">
      <div className="">
        <button
          onClick={handleOpen}
          className="group flex items-center">
          <div className="flex mx-3 h-[48px] w-[48px] rounded-3xl group-hover:rounded-2xl transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-primary-300">
            <Plus
              className="group-hover:text-primary-700 text-primary-400 transition textx-emeral-500"
              size={25}
            />
          </div>
        </button>
        <div className=""></div>
      </div>
    </ActionTooltip>
  );
};

export default NavigationAction;
