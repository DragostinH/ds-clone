"use client";

import { useSession } from "next-auth/react";

const LoggedUserBox = () => {
  const { data: loggedUser } = useSession();

  if (!loggedUser) return null;
  return (
    <button className="group flex items-center">
      <div className="flex mx-3 h-[48px] w-[48px] rounded-3xl group-hover:rounded-2xl transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-primary-300">
        U
      </div>
    </button>
  );
};

export default LoggedUserBox;
