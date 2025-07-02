import { Member } from "@prisma/client";

interface ServerMembersProps {
  members: Member[];
}

const ServerMembers = ({ members }: ServerMembersProps) => {
  return (
    <div className="">
      <div className="">
        {members.map((member) => {
          return (
            <div className="">
              <p>{member.userId}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServerMembers;
