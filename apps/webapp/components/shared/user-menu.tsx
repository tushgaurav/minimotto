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
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-semibold">
                            {user.name.charAt(0) + user.name.charAt(user.name.indexOf(" ") + 1)}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-60 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-lg"
                sideOffset={8}
            >
                <div className="p-2">
                    <div className="flex flex-col">
                        <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">{user.name}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{user.email}</p>
                    </div>
                </div>

                <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />

                <div className="py-1 space-y-1">
                    <DropdownMenuItem className="px-2 py-1 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">
                        <UserIcon className="mr-1 h-4 w-4" />
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="px-2 py-1 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">
                        <Settings className="mr-1 h-4 w-4" />
                        Settings
                    </DropdownMenuItem>
                </div>

                <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />

                <DropdownMenuItem onClick={onSignOut} className="px-2 py-1 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">
                    <LogOut className="mr-1 h-4 w-4" />
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
