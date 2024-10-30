"use client";
import { useSocket } from "@/components/providers/socket-provider";
import { Badge } from "@/components/ui/badge";

const SocketIndicator = () => {
  const socket = useSocket();

  if (!socket.isConnected) {
    return (
      <div className="">
        <Badge variant="secondary">Disconnected</Badge>
      </div>
    );
  }

  return (
    <div className="">
      <Badge
        className="bg-emerald-600"
        color="outline">
        Live
      </Badge>
    </div>
  );
};

export default SocketIndicator;
