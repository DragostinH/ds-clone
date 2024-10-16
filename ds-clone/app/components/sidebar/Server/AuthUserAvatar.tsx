import { useState } from "react";
import clsx from "clsx";
import { User } from "@prisma/client";

interface AuthUserAvatarProps {
  currentUser: User;
}

const AuthUserAvatar = ({ currentUser }: AuthUserAvatarProps) => {
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative">
      <section
        className="border-[1px] h-12 w-12 items-center flex justify-center rounded-full
        bg-primary-500 cursor-pointer 
        transition-all
        duration-600
        ease-in-out
        hover:transform
        hover:scale-110
        hover:rotate-12
        hover:bg-opacity-50
        hover:shadow-lg
        hover:border-transparent
        "
        onClick={toggleMenu}>
        {currentUser?.image ? (
          <img
            src={currentUser?.image}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className={clsx("text-white text-sm font-semibold")}>{currentUser?.name?.slice(0, 1).toUpperCase()}</div>
        )}
      </section>
    </div>
  );
};

export default AuthUserAvatar;
