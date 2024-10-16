import { randomInt } from "crypto";
import clsx from "clsx";

interface AuthUserAvatarProps {
  image: string;
  name: string;
}

const AuthUserAvatar = ({ image, name }: AuthUserAvatarProps) => {
  const backgroundColours = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-indigo-500",
    "bg-purple-500",
  ];
  return (
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
    >
      {image ? (
        <img src={image} alt="User Avatar" className="w-10 h-10 rounded-full" />
      ) : (
        <div className={clsx("text-white text-sm font-semibold")}>
          {name.slice(0, 1).toUpperCase()}
        </div>
      )}
    </section>
  );
};

export default AuthUserAvatar;
