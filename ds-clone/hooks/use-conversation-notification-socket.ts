import { User } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";

type ConversationNotificationSocketProps = {
  queryKey: string;
  updateKey: string;
  loggedInUser: User;
};

export const useConversationNotificationSocket = ({ queryKey, updateKey, loggedInUser }: ConversationNotificationSocketProps) => {};
