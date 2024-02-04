"use client";

import { onBlock, onUnBlock } from "@/actions/block";
import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}
export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong!"));
    });
  };
  const handleUnFollow = () => {
    startTransition(() => {
      onUnFollow(userId)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) =>
          toast.success(`You have now  blocked ${data?.blocked.username}`)
        )
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  const handleUnBlock = () => {
    startTransition(() => {
      onUnBlock(userId)
        .then((data) =>
          toast.success(`You have now  unblocked ${data.blocked.username}`)
        )
        .catch(() => toast.error("Something went wrong!"));
    });
  };
  return (
    <>
      <Button
        variant="primary"
        onClick={isFollowing ? handleUnFollow : handleFollow}
        disabled={isPending}
      >
        {isFollowing ? "UnFollow" : "Follow"}
      </Button>
      <Button onClick={handleUnBlock} disabled={isPending}>
        Block
      </Button>
    </>
  );
};
