"use client";

import { useSocket } from "@/components/providers/socket-provider";
import { usePathname, useSearchParams, useParams } from "next/navigation";
import { useEffect } from "react";

export function NavigationEvents() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();
  const { socket } = useSocket();

  useEffect(() => {
    if (params?.conversationId) {
      console.log("[NAVIGATION_EVENTS_PARAMS.CONVERSATIONID]", params.conversationId);
    }
  }, [params]);

  return null;
}
