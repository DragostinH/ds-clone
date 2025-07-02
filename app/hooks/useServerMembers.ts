import { MembersWithUsers } from "@/types";
import axios from "axios";

export async function useServerMembers(id: string): Promise<MembersWithUsers[]> {
  if (id) {
    const res = await axios.get(`/api/server/members/${id}`);
    return res.data.members;
  }

  return [];
}
