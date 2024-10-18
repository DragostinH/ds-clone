
import { signOut } from "next-auth/react";
import Button from "../../components/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import EmptyState from "../../components/EmptyState";
import getAuthUser from "@/app/actions/getAuthUser";
import { useEffect, useState } from "react";

const Messages = () => {

  return (
    <div className="h-full">
      <EmptyState />
    </div>
  );
};

export default Messages;
