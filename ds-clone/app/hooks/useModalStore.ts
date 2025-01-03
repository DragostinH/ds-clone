import { Channel, ChannelType, Server, User } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "create-server"
  | "join-server"
  | "create-channel"
  | "invite-member"
  | "manage-members"
  | "leave-server"
  | "delete-server"
  | "delete-channel"
  | "edit-channel"
  | "edit-server"
  | "server-settings"
  | "view-account"
  | "delete-message";

interface ModalData {
  channel?: Channel;
  server?: Server;
  channelType?: ChannelType;
  user?: User;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
