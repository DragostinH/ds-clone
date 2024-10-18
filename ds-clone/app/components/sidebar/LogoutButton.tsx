import clsx from "clsx";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiArrowToLeft } from "react-icons/bi";

const LogoutButton = () => {
  const router = useRouter();
  const Icon = BiArrowToLeft;
  const handleSignout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };
  return (
    <div
      className="logout_
        flex
        items-center
        justify-center
        relative
        overflow-hidden
        p-2
    ">
      <div
        onClick={() => {
          handleSignout();
        }}
        className={clsx(
          "border-[1px] h-12 w-12 items-center flex justify-center rounded-full",
          "cursor-pointer transition-all duration-600 ease-in-out",
          "hover:transform hover:scale-90 hover:rotate-[-24deg] hover:bg-opacity-50",
          "hover:shadow-lg hover:border-transparent"
        )}>
        <div>
          <Icon />
        </div>
      </div>
    </div>
  );
};

export default LogoutButton;
