import getAuthUser from "@/app/actions/getAuthUser";
import ChannelsSidebar from "@/app/components/sidebar/Server/ChannelsSidebar";
import { ObjectId } from "bson";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const ServerIdLayout = async ({ children, params }: { children: ReactNode; params: { serverId: string } }) => {
  const authUser = await getAuthUser();
  if (!authUser) return redirect("/login");
  const { serverId } = params;
  if (!ObjectId.isValid(serverId)) {
    console.log("Invalid server ID");
    return redirect("/messages");
  }
  const server = await prisma?.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          userId: authUser.id,
        },
      },
    },
  });

  return (
    <div className="h-full flex">
      <aside className="hidden border-r-[1px] border-primary-900 md:flex h-full w-60 flex-col inset-y-0">
        <ChannelsSidebar serverId={serverId} />
      </aside>
      <main className="h-full">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
