import { ReactNode } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import getAuthUser from "../actions/getAuthUser";
import getUsers from "../actions/getUsers";
import UserList from "./messages/components/UserList";
import AuthUserAvatar from "../components/sidebar/Server/AuthUserAvatar";
import AuthUserBox from "./messages/components/AuthUserBox";
import ServerSidebar from "../components/sidebar/Server/ServerSidebar";
import BaseContainer from "../components/sidebar/Base/BaseContainer";

export default async function ChannelLayout({ children }: { children: ReactNode }) {
  const currentUser = await getAuthUser();
  
  const users = (await getUsers()) || [];
  return (
    <Sidebar>
      <div className="h-full w-full overflow-hidden flex border-[1px] ">
        <ServerSidebar />
        <div className="flex-grow flex">
          <BaseContainer users={users}>{children}</BaseContainer>
        </div>
      </div>
    </Sidebar>
  );
}
