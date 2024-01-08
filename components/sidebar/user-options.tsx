import { useUser } from "@/hooks/useUser";
import { Login, Signup } from "../auth/auth";
import AvatarDropDown from "../avatar/avatar-dropdown";
import { Skeleton } from "../ui/skeleton";

export default function UserOptions() {
  const { user, isUserLoading, error } = useUser();

  if (isUserLoading) {
    return (
      <div className="p-4 mt-auto w-full">
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="p-4 mt-auto w-full">
      {user ? (
        <AvatarDropDown usersName={user.name} />
      ) : (
        <div className="flex flex-col space-y-2">
          <Signup />
          <Login />
        </div>
      )}
    </div>
  );
}
