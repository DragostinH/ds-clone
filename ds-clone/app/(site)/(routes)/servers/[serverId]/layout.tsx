import getAuthUser from "@/app/actions/getAuthUser";
import { ReactNode } from "react";

const ServerIdLayout = async ({ children, params }: { children: ReactNode }) => {
  const authUser = await getAuthUser();
  if (!authUser) return <div>Not authenticated</div>;
  

  return <div className="">{children}</div>;
};

export default ServerIdLayout;
