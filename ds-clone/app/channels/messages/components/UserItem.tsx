import { User } from "@prisma/client";

interface UserItemProps {
	user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
	return (
		<div className="flex items-center space-x-2">
			<img
				className="w-8 h-8 rounded-full"
			/>
			<div>
				<p className="font-semibold">{user.name}</p>
				<p className="text-sm text-gray-400">{user.email}</p>
			</div>
		</div>
	);
};

export default UserItem;
