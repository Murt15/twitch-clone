"use client"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { useSidebar } from "@/store/use-sidebar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { UserAvatar } from "@/components/user-avatar"
import { LiveBadge } from "@/components/live-badge"


interface UserItemProps {
    userName: string,
    imageUrl: string,
    isLive?: boolean
}
export const UserItem = ({ userName, imageUrl, isLive }: UserItemProps) => {
    const pathName = usePathname();
    const { collapsed } = useSidebar(state => state);

    const href = `/${userName}`;

    const isActive = pathName === href;

    return (
        <Button
            asChild
            variant="ghost"
            className={cn("w-full h-12",
                collapsed ? "justify-center" : "justify-start",
                isActive && "bg-accent")}
        >
            <Link href={href}>
                <div className={cn("flex items-center w-full gap-x-4", collapsed && "justify-center")}>
                    <UserAvatar
                        userName={userName}
                        imageUrl={imageUrl}
                        isLive={isLive} />

                    {!collapsed &&
                        (
                            <p className="truncate">{userName}</p>
                        )
                    }
                    {!collapsed && isLive && (
                        <LiveBadge className="ml-auto" />
                    )}
                </div>
            </Link>
        </Button>
    )
}

export const UserItemSkeleton = () => {
    return (
        <li className="flex items-center gap-x-4 px-3 py-2">
            <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
            <div className="flex-1">
                <Skeleton className="h-6" />
            </div>
        </li>
    );
};