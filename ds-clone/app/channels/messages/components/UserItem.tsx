import { User } from "@prisma/client";
import Link from "next/link";

interface UserItemProps {
  user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
	const handleLinkCreation = (()=>{
		// find out if the user prop and the logged in user have had a conversation. if they had grab the conversation id and return the link to that conversation
		// if they haven't had a conversation create a new conversation and grab the id and return the link to that conversation

		// return the link to the conversation

		
	})
  return (
    <Link
      href={`/channels/messages/${user.id}`}
      className="flex items-center space-x-2">
      <img className="w-8 h-8 rounded-full" />
      <div>
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm text-gray-400">{user.email}</p>
      </div>
    </Link>
  );
};

export default UserItem;
