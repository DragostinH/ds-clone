"use client";

import { useSession } from "next-auth/react";

const LoggedUserBox = () => {
  const {data: loggedUser} = useSession();

  if (!loggedUser) return null;
  return (
    <section
      className="
          user-panel_
          flex-grow-0
          flex-shrink-0
          basis-auto
          z-2">
      <div
        className="
            wrapper_
            relative
            overflow-visible
            "></div>
      <div
        className="
            h-14
            text-xs
            weight-500
            flex
            items-center
            relative
            border-[1px]
            border-black
            ">
        {loggedUser?.user?.name}
      </div>
    </section>
  );
};

export default LoggedUserBox;
