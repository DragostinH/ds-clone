"use client";

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { DialogTitle } from "@radix-ui/react-dialog";
import { SearchIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC, ReactNode, useEffect, useState } from "react";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

const ServerSearch: FC<ServerSearchProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();

  // TODO: add onClick functionality to navigate to members/channels

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
  return (
    <>
      <button
        onClick={handleOpen}
        className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10
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
        <CommandInput placeholder="Search channels and members" />
        <CommandList>
          <CommandEmpty>
            <p className="text-sm text-muted-foreground dark:text-muted-foreground">
              No results found for <span className="font-semibold">"Search"</span>
            </p>
          </CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup
                key={label}
                heading={label}>
                {data.map(({ icon, name, id }) => {
                  return (
                    <CommandItem
                      className="cursor-pointer"
                      key={id}>
                      {icon}
                      <span className="ml-2">{name}</span>
                    </CommandItem>
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
    </>
  );
};

export default ServerSearch;
