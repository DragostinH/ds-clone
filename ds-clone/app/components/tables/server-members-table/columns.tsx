import { MembersWithUsers } from "@/types";
import { Member } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import ActionTooltip from "../../ActionTooltip";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import UserAvatar from "../../UserAvatar";

export const columns: ColumnDef<MembersWithUsers>[] = [
  {
    accessorKey: "user",
    header: "Name",
    cell({ row }) {
      if (row.getValue("user")) {
        const { nickname, email, image } = row.getValue("user") as { nickname: string; email: string; image: string };
        const { original } = row;
        return (
          <div className="flex items-center space-x-2">
            <UserAvatar
              src={image}
              alt={nickname}
              className="h-8 w-8"
            />
            <div>
              <p>{nickname}</p>
              <p className="text-sm text-gray-400">{email}</p>
            </div>
          </div>
        );
      }
    },
  },

  {
    accessorKey: "user.role",
    header: "Role",
    cell(props) {
      return <span>{props.row.original.role}</span>;
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => console.log(row.original)}>Action function</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Item</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
