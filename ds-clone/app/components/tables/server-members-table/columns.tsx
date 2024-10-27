import { MembersWithUsers } from "@/types";
import { Member } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import ActionTooltip from "../../ActionTooltip";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<MembersWithUsers>[] = [
  {
    accessorKey: "user.nickname",
    header: "Nickname",
  },

  {
    accessorKey: "user.email",
    header: "Email",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <ActionTooltip
          label="Actions"
          side="top"
          align="center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* <Button
                variant="ghost"
                className="h-8 w-8 p-0">
                <span className="sr-only">Open actions</span>
                <MoreHorizontal className="h-5 w-5" />
              </Button> */}
              {row.id}
            </DropdownMenuTrigger>
          </DropdownMenu>
        </ActionTooltip>
      );
    },
  },
];
