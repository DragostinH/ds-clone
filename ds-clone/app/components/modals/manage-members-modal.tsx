"use client";

import { useModal } from "@/app/hooks/useModalStore";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ServerWithMembersWithProfiles } from "@/types";
import { DataTable } from "../tables/server-members-table/data-table";
import { columns } from "../tables/server-members-table/columns";
import client from "@/app/libs/prismadb";
import { useEffect, useRef, useState } from "react";
import { Member } from "@prisma/client";
import { useServerMembers } from "@/app/hooks/useServerMembers";
import axios from "axios";

const ManageMembersModal = () => {
  const { onOpen, isOpen, onClose, data, type } = useModal();
  const { server } = data as { server: ServerWithMembersWithProfiles };
  const [members, setMembers] = useState<Member[]>(server?.members);
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "manage-members";

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-6 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Manager Server Members</DialogTitle>
          <DialogDescription>{server?.members?.length}</DialogDescription>
        </DialogHeader>

        {/* <DataTable
          columns={columns}
          data={members}
        /> */}
      </DialogContent>
    </Dialog>
  );
};

export default ManageMembersModal;
