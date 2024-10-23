import { User } from "@prisma/client";

interface ChatHeaderProps {
  user: User;
}

const ChatHeader = ({ user }: ChatHeaderProps) => {
  return (
    <div
      className="
     border-b-[1px] border-gray-200
        h-16
        flex
        items-center
        justify-between
        px-4
        bg-white
        sticky

    ">
      <div className="flex items-center space-x-2">
        <img
          src={user?.image}
          alt=""
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{user?.name}</p>
          <p className="text-sm text-gray-500">Active now</p>
        </div>
      </div>
      <div className="flex items-center space-x-4"></div>
    </div>
  );
};

export default ChatHeader;
