import { Logout } from "@/components/auth";
import { RxExit } from "react-icons/rx";
import { UserAvatar } from "../avatar/Avatars";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type AvatarDropDownProps = {
  className?: string;
  usersName: string;
};

export default function AvatarDropDown({
  className,
  usersName,
}: AvatarDropDownProps) {
  return (
    <Popover>
      <PopoverTrigger className="hover:cursor-pointer w-[10rem]">
        <div className="flex flex-row gap-3 items-center hover:bg-opacity-80 dark:hover:bg-zinc-900 hover:bg-gray-500/50 p-[0.3rem] rounded-md">
          <UserAvatar className="w-8 h-8" />
          <span className="text-md text-gray-700 dark:text-gray-50">
            {usersName}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-w-[10rem] dark:bg-zinc-950 bg-gray-300 shadow-lg rounded-md p-[0.3rem]">
        <div className="flex flex-col p-[0.5rem]">
          <button className="flex items-center hover:bg-opacity-80 dark:hover:bg-zinc-900 hover:bg-gray-500/50 p-[0.3rem] rounded-md gap-2">
            <UserAvatar className="w-5 h-5 text-sm" />
            <span>Profile</span>
          </button>

          <button className="flex items-center hover:bg-opacity-80 dark:hover:bg-zinc-900 hover:bg-gray-500/50 p-[0.3rem] rounded-md gap-2">
            <RxExit className="w-5 h-5 text-sm" />
            <Logout />
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
