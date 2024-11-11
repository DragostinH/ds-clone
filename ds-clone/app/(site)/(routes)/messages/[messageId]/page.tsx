import getAuthUser from "@/actions/getAuthUser";
import client from "@/app/libs/prismadb";
import { redirect } from "next/navigation";
import { FC } from "react";

interface PrivateMessageProps {
  params: {
    userId: string;
  };
}

const PrivateMessage: FC<PrivateMessageProps> = async ({ params: { userId } }) => {
  const authUser = await getAuthUser();

  if (!authUser) return redirect("/login");

  // const conversation = await client?.conversation.findUnique({
  //   where: {
      
  //   },
  // });
  return (
    <div className="">
      <div className="">somechat</div>
    </div>
  );
};

export default PrivateMessage;
