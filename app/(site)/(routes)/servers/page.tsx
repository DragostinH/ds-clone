import getAuthUser from "@/actions/getAuthUser";
import { redirect } from "next/navigation";

const ServerHomePage = async () => {
  const authUser = await getAuthUser();

  if (!authUser) return redirect("/login");

  redirect("/messages");
};

export default ServerHomePage;
