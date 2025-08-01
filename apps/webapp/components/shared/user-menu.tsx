import {
    User as UserIcon,
    Settings,
    LogOut,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "better-auth"

export default function UserMenu({ user, onSignOut }: { user: User, onSignOut: () => void }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full border-1 hover:bg-secondary-foreground/50 dark:hover:bg-secondary-foreground/50">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-muted text-muted-foreground text-sm font-semibold">
                            {user.name.charAt(0) + user.name.charAt(user.name.indexOf(" ") + 1)}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-60"
                sideOffset={8}
            >
                <div className="p-2">
                    <div className="flex flex-col">
                        <p className="font-semibold text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                </div>

                <DropdownMenuSeparator />

                <div className="py-1 space-y-1">
                    <DropdownMenuItem>
                        <UserIcon className="mr-2 h-4 w-4" />
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </DropdownMenuItem>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={onSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
