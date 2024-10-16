"use client";

import { signOut } from "next-auth/react";
import Button from "../../components/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import EmptyState from "../../components/EmptyState";

const Messages = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut({
      redirect: false,
    }).then(() => {
      toast.success("You have successfully logged out!");
      router.push("/");
    });
  };

  return (
    <div className="h-full">
      asd
      <EmptyState />
    </div>
  );
};

export default Messages;
