"use client";

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";
import { SearchIcon } from "lucide-react";
import { FC, ReactNode, useEffect, useState } from "react";

interface UserSearchProps {
  data: {
    label: string;
    data:
      | {
          avatar: ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

const UserSearch: FC<UserSearchProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "q" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
    };
  }, []);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenChatWithUser = (id: any) => {
    // TODO: Finish opening a chat with the user by clicking on the user
    console.log("Clicked on user", id);
  };
  return (
    <div className="mt-2">
      <button
        onClick={handleOpen}
        className="group bg-zinc-900 px-1 py-1 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10
          dark:hover:bg-zinc-700/50 transition
          ">
        <SearchIcon
          width={20}
          height={20}
        />
        <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">Search</p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          <span className="text-sm">CTRL</span>+ Q
        </kbd>
      </button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}>
        <CommandInput placeholder="Search for friends to chat with..." />
        <CommandList>
          <CommandEmpty>
            <p className="text-sm text-muted-foreground dark:text-muted-foreground">
              No results found for <span className="font-semibold">"Search"</span>
            </p>
          </CommandEmpty>
          {data.map(({ label, data }) => {
            return (
              <CommandGroup
                key={label}
                heading={label}>
                {data?.map(({ avatar, name, id }) => {
                  return (
                    <div
                      key={id}
                      className=""
                      onClick={() => {
                        handleOpenChatWithUser(id);
                      }}>
                      <CommandItem
                        className="cursor-pointer"
                        key={id}>
                        {avatar}
                        <span className="ml-2">{name}</span>
                      </CommandItem>
                    </div>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
        <div>
          <DialogTitle></DialogTitle>
        </div>
      </CommandDialog>
    </div>
  );
};

export default UserSearch;
