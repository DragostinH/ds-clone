"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Member } from "@prisma/client";
import Image from "next/image";
import ServerImage from "@/public/default-image.jpg";
import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AcceptInviteBoxProps {
  serverId: string;
  serverName: string;
  serverMembers: Member[];
  serverImage: string;
  inviteId: string;
}

const AcceptInviteBox: FC<AcceptInviteBoxProps> = ({ serverId, serverName, serverMembers, serverImage, inviteId }) => {
  const router = useRouter();
  const acceptInvite = async () => {
    try {
      await axios.post(`/api/invite/accept/${inviteId}/`);
      router.push(`/servers/${serverId}`);
    } catch (error) {
      console.error(error);
      console.log("[INVITE_ACCEPT_ERROR]", error);
    }
  };
  return (
    <Card className="bg-primary-900 border-0 w-96 flex flex-col items-center justify-center">
      <CardHeader className="text-center">
        <Image
          src={ServerImage}
          alt={serverName}
          className="
            rounded-full
            w-24
            h-24
            object-cover
            border-4
            border-primary-300
            bg-primary-800
            p-1
            "
        />
        <CardTitle>{serverName}</CardTitle>
        <CardDescription>Members: {serverMembers.length}</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p>You have been invited to join the server "{serverName}"</p>
      </CardContent>
      <CardFooter className="w-full">
        <Button
          onClick={acceptInvite}
          className="
          w-full
            bg-primary-500
            hover:bg-primary-600
            text-white
            ">
          Accept Invite
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AcceptInviteBox;
