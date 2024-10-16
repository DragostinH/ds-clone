// import a letter icon from react-icons
import React from "react";
import { BsChatDots } from "react-icons/bs";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const MessagesRouteLink = () => {
  const Icon = BsChatDots;
  const router = useRouter();
  const pathName = usePathname();
  const active = pathName === "/channels/messages";
  return (
    <Link
      href="/channels/messages"
      className={clsx(
        "border-[1px] h-12 w-12 items-center flex justify-center rounded-full",
        "cursor-pointer transition-all duration-600 ease-in-out",
        "hover:transform hover:scale-90 hover:rotate-[-24deg] hover:bg-opacity-50",
        "hover:shadow-lg hover:border-transparent",
        {
          "bg-primary-500": active,
          "border-primary-500": !active,
        }
      )}>
      <div>
        <Icon
          className={clsx({
            "text-white": active,
            "text-primary-500": !active,
          })}
        />
      </div>
    </Link>
  );
};

export default MessagesRouteLink;
