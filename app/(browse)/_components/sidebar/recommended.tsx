"use client"
import { useSidebar } from "@/store/use-sidebar"
import { User } from "@prisma/client"
import { UserItem, UserItemSkeleton } from "./user-item"

interface RecommendedProps {
    data: User[]
}

export const Recommended = ({ data }: RecommendedProps) => {
    const { collapsed } = useSidebar(state => state);

    const showLabel = !collapsed && data.length > 0;
    return (
        <>
            {showLabel &&
                (<div className="pl-6 mb-4">
                    <p className="text-sm text-muted-foreground">Recommended</p>
                </div>
                )
            }
            <ul>
                {data.map((user) => (
                    <UserItem
                        key={user.id}
                        username={user.username}
                        imageUrl={user.imageUrl}
                        isLive={false}
                    />
                ))}
            </ul>
        </>
    )
}

export const RecommendedSkeleton = () => {
    return (
        <ul className="px-2">
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i} />
            ))}
        </ul>
    )
}