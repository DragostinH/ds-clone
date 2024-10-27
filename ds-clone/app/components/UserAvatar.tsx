import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FC } from "react";

interface UserAvatarProps {
  src?: string;
  alt?: string;
  className?: string;
}

const UserAvatar: FC<UserAvatarProps> = ({ src, alt, className }) => {
  return (
    <Avatar>
      <AvatarImage src={src} />
    </Avatar>
  );
};

export default UserAvatar;
