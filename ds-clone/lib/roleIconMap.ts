import { MemberRole } from "@prisma/client";

export const roleIconMap = {
  [MemberRole.OWNER]: "👑",
  // ADMIN: "🛡️",
  [MemberRole.MODERATOR]: "🛡️",
  [MemberRole.GUEST]: "👤",
  // BANNED: "🚫",
  // KICKED: "🚫",
};
