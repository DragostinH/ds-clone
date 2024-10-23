"use client";

import { useRouter } from "next/navigation";
import EmptyState from "../components/EmptyState";
import { useEffect, useState } from "react";
import FullScreenLoader from "../components/loaders/FullScreenLoader";

const Channels = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    router.push("/channels/messages");
  });
  return (
    <div className="">
      <div className="">some data</div>
    </div>
  );
};

export default Channels;
