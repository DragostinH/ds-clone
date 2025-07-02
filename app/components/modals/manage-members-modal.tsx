"use client";

import { useModal } from "@/app/hooks/useModalStore";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MembersWithUsers, ServerWithMembersWithProfiles } from "@/types";
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
  const [members, setMembers] = useState<MembersWithUsers[]>(server?.members || []);
  const [isLoading, setIsLoading] = useState(false);
  const [test, setTest] = useState<Member>();
  const dummyTableData: MembersWithUsers[] = [];

  useEffect(() => {
    if (type === "manage-members") {
      useServerMembers(server?.id).then((members) => {
        setMembers(members);
      });
    }
  }, [type, server?.id]);

  const isModalOpen = isOpen && type === "manage-members";

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-6 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Manage Server Members</DialogTitle>
          <DialogDescription>Kick or change the role of the users in the server.</DialogDescription>
        </DialogHeader>

        <p>{test?.id}</p>
        {type === "manage-members" && (
          <DataTable
            columns={columns}
            data={members}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ManageMembersModal;
