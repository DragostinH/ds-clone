import { Input } from "@/components/ui/input";
import { FC } from "react";
interface UserSearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}
const UserSearchBar: FC<UserSearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex items-center relative justify-between px-6 py-4 border-zinc-200 dark:border-zinc-700">
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full
          border-[1px]
          dark:bg-zinc-800
          dark:border-zinc-700/50
          dark:text-white
          focus:ring-2
          focus:ring-inset
          focus:ring-sky-600
          sm:text-sm
          sm:leading-6"
        type="search"
        about="Search for users"
        placeholder="Search for users..."
      />
    </div>
  );
};

export default UserSearchBar;
