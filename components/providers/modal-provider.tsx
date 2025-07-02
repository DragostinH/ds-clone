"use client";

import { CreateChannelModal } from "@/app/components/modals/create-channel-modal";
import { CreateInviteModal } from "@/app/components/modals/create-invite-modal";
import { CreateServerModal } from "@/app/components/modals/create-server-modal";
import { DeleteChannelModal } from "@/app/components/modals/delete-channel-modal";
import { DeleteServerModal } from "@/app/components/modals/delete-server-modal";
import { EditChannelModal } from "@/app/components/modals/edit-channel-modal";
import { LeaverServerModal } from "@/app/components/modals/leaver-server-modal";
import ManageMembersModal from "@/app/components/modals/manage-members-modal";
import { ServerSettingsModal } from "@/app/components/modals/server-settings-modal";
import ViewAccountDetailsModal from "@/app/components/modals/view-account-details-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  //   make sure there are no hydration mismatches
  if (!isMounted) return null;
  return (
    <>
      <CreateServerModal />
      <CreateInviteModal />
      <ServerSettingsModal />
      <ManageMembersModal />
      <CreateChannelModal />
      <LeaverServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <ViewAccountDetailsModal />
    </>
  );
};
