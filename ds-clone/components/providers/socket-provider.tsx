"use client";

import { useSession } from "next-auth/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
  transport?: string;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  transport: "",
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<any | null>(null);

  const [isConnected, setIsConnected] = useState(false);

  const [transport, setTransport] = useState("N/A");

  const { data: session, status } = useSession();

  useEffect(() => {
    const client = new (ClientIO as any)(process.env.NEXT_PUBLIC_API_URL!, {
      // cors: {
      //   origin: "*",
      //   methods: ["GET", "POST"],
      // },
      path: "/api/socket/io",
      // addTrailingSlash: false,
      // transports: ["websocket", "polling"],
    });

    client.on("connect", () => {
      setIsConnected(true);
      setTransport(client.io.engine.transport.name);
      client.io.engine.on("upgrade", (transport: any) => {
        setTransport(transport.name);
      });
    });

    client.on("disconnect", () => {
      setIsConnected(false);
      setTransport("N/A");
    });

    setSocket(client);

    return () => {
      // client.off("connect");
      // client.off("disconnect");
      client.disconnect();
    };
  }, [session]);

  // useEffect(() => {

  //   function onConnect() {
  //     setIsConnected(true);
  //     setTransport(socket.io.engine.transport.name);

  //     socket.io.engine.on("upgrade", (transport: any) => {
  //       setTransport(transport.name);
  //     });
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //     setTransport("N/A");
  //   }

  //   socket.on("connect", onConnect);
  //   socket.on("disconnect", onDisconnect);

  //   return () => {
  //     socket.off("connect", onConnect);
  //     socket.off("disconnect", onDisconnect);
  //   };
  // }, []);

  return <SocketContext.Provider value={{ socket, isConnected, transport }}>{children}</SocketContext.Provider>;
};
