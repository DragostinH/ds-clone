"use client";

import { CreateServerModal } from "@/app/components/modals/create-server-modal";
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
    </>
  );
};
