"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const TestingWebsockets = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [transport, setTransport] = useState("N/A");
  const socket = io();
  const transportName = socket?.io?.engine?.transport?.name;

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(transportName);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div className="">
      <div className="">Status: {isConnected ? "Connected" : "Disconnected"}</div>
      <div className="">Transport: {transport}</div>
    </div>
  );
};

export default TestingWebsockets;
