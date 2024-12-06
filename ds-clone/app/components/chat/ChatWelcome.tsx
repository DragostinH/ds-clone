import { User } from "@prisma/client";
import { Hash } from "lucide-react";
import UserAvatar from "../UserAvatar";

interface ChatWelcomeProps {
  type: "channel" | "conversation";
  name: string;
  user?: User;
}

const ChatWelcome = ({ type, name, user }: ChatWelcomeProps) => {
  return (
    <div className="space-y-2 px-4 mb-4">
      {type === "channel" && (
        <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
          <Hash size={40} />
        </div>
      )}
      <p className="text-xl md:text-3xl font-bold">
        {type === "channel" ? (
          "Welcome to #"
        ) : (
          <UserAvatar
            src={user?.image || ""}
            alt={user?.nickname}
            className="w-8 h-8 md:w-14 md:h-14 rounded-full mr-2"
          />
        )}
        {name}
      </p>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">{type === "channel" ? "This is the beginning of the channel." : "This is the beginning of your conversation."}</p>
    </div>
  );
};

export default ChatWelcome;
