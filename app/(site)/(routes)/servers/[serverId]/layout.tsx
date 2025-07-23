import getAuthUser from "@/actions/getAuthUser";
import ServerMembersSidebar from "@/app/components/chat/ServerMembersSidebar";
import ChannelsSidebar from "@/app/components/sidebar/Server/ChannelsSidebar";
import { ObjectId } from "bson";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const ServerIdLayout = async (props: { children: ReactNode; params: Promise<{ serverId: string }> }) => {
  const params = await props.params;

  const {
    children
  } = props;

  const authUser = await getAuthUser();
  if (!authUser) return redirect("/login");
  const { serverId } = params;

  if (!ObjectId.isValid(serverId)) {
    console.log("Invalid server ID");
    return redirect("/messages");
  }

  const cookiesStore = await cookies();

  const defaultOpen = cookiesStore.get("sidebar:state")?.value === "closed";

  return (
    <div className="h-full flex">
      <aside className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ChannelsSidebar serverId={serverId} />
      </aside>
        <main className="h-full md:pl-60 w-full">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
