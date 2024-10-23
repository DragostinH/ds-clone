import { redirect } from "next/navigation";
import getAuthUser from "../actions/getAuthUser";

const Home = () => {
  const authUser = getAuthUser();

  if (!authUser) return redirect("/login");
  return (
    <div className="">
      <div className=""></div>
    </div>
  );
};

export default Home;
