
interface UserItemProps {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

const UserItem: React.FC<UserItemProps> = ({ id, name, email, avatar }) => {
  return (
    <div className="flex items-center space-x-2">
      <img src={avatar} alt={name} className="w-8 h-8 rounded-full" />
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-400">{email}</p>
      </div>
    </div>
  );
};

export default UserItem;
