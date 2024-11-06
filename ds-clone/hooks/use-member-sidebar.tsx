"use client";

import { useContext } from "react";
import { SidebarContext } from "@/app/sidebar-context";

export const useMemberSidebar = () => {
  const { open, setOpen } = useContext(SidebarContext);

  return { open, setOpen };
};
