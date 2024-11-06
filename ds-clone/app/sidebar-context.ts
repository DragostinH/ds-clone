"use client";

import { createContext, Dispatch, SetStateAction } from "react";

type SidebarContextType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const SidebarContext = createContext<SidebarContextType>({
  open: false,
  setOpen: () => {},
});

export { SidebarContext };
export type { SidebarContextType };
