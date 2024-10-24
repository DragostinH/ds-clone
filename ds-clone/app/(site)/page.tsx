import { redirect } from "next/navigation";
import getAuthUser from "../actions/getAuthUser";
import getServer from "../actions/getServer";

const Home = async () => {
  const authUser = await getAuthUser();
  // if (!authUser) return redirect("/login");
  return (
    <div className="">
      <div className=""></div>
    </div>
  );
};

export default Home;
