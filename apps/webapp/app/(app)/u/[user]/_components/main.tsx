import { User } from "better-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MainPanelProps {
  user: User;
  children?: React.ReactNode;
}

export default function MainPanel({ user, children }: MainPanelProps) {
  const userInitial = (user?.name || user?.email || "")
    .trim()
    .charAt(0)
    .toUpperCase();
  const avatarSrc = user?.image || "/images/user.png";

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <div className="relative size-40 rounded-full grid place-items-center">
        <div className="absolute inset-0 rounded-full bg-yellow-400 dark:bg-yellow-500" />
        <div className="relative size-32 rounded-full ring-4 ring-background overflow-hidden">
          <Avatar className="size-32">
            <AvatarImage
              src={avatarSrc}
              alt={user?.name || user?.email || "User"}
            />
            <AvatarFallback className="text-lg font-semibold">
              {userInitial || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="text-center">
        <div className="text-base sm:text-lg font-semibold">
          {user?.name || "Anonymous"}
        </div>
        <div className="text-xs sm:text-sm text-muted-foreground">
          {user?.email || "No email provided"}
        </div>
      </div>

      {children ? <div className="w-full max-w-md">{children}</div> : null}
    </div>
  );
}
