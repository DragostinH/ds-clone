"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BiArrowToLeft } from "react-icons/bi";
import ActionTooltip from "../ActionTooltip";

const LogoutButton = () => {
  const router = useRouter();
  const Icon = BiArrowToLeft;
  const handleSignout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };
  return (
    <ActionTooltip
      label="Logout"
      align="center"
      side="right">
      <button
        onClick={handleSignout}
        className="group flex items-center">
        <div
          className="flex border-primary-300 border-[1px] mx-3 h-[48px] w-[48px] rounded-3xl group-hover:rounded-2xl transition-all overflow-hidden items-center justify-center bg-background
        group-hover:bg-primary-900 dark:bg-neutral-700 dark:group-hover:bg-primary-300 dark:group-hover:text-primary-900">
          <Icon />
        </div>
      </button>
    </ActionTooltip>
  );
};

export default LogoutButton;
