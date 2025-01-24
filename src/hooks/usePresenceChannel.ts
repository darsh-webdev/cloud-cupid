/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from "react";
import usePresenceStore from "./usePresenceStore";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "@/lib/pusher";
import { updateLastActive } from "@/app/actions/memberActions";

export const usePresenceChannel = (userId?: string | null) => {
  const setMembersId = usePresenceStore((state) => state.setMembersId);
  const add = usePresenceStore((state) => state.add);
  const remove = usePresenceStore((state) => state.remove);

  const channelRef = useRef<Channel | null>(null);

  const handleSetMembers = useCallback(
    (memberIds: string[]) => {
      setMembersId(memberIds);
    },
    [setMembersId]
  );

  const handleAddMember = useCallback(
    (memberId: string) => {
      add(memberId);
    },
    [add]
  );

  const handleRemoveMember = useCallback(
    (memberId: string) => {
      remove(memberId);
    },
    [remove]
  );

  useEffect(() => {
    if (!userId) return;
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe("presence-match-me");

      channelRef.current.bind(
        "pusher:subscription_succeeded",
        async (members: Members) => {
          handleSetMembers(Object.keys(members.members));
          await updateLastActive();
        }
      );

      channelRef.current.bind(
        "pusher:member_added",
        (member: Record<string, any>) => {
          handleAddMember(member.id);
        }
      );

      channelRef.current.bind(
        "pusher:member_removed",
        (member: Record<string, any>) => {
          handleRemoveMember(member.id);
        }
      );
    }

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind(
          "pusher:subscription_succeeded",
          handleSetMembers
        );
        channelRef.current.unbind("pusher:member_added", handleAddMember);
        channelRef.current.unbind("pusher:member_removed", handleRemoveMember);
        channelRef.current = null;
      }
    };
  }, [handleAddMember, handleRemoveMember, handleSetMembers, userId]);
};
