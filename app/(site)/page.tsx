import { redirect } from "next/navigation";
import getAuthUser from "@/actions/getAuthUser";

const Home = async () => {
  const authUser = await getAuthUser();
  if (!authUser) return redirect("/login");

  redirect("/messages");
};

export default Home;
