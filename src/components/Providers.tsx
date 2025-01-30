"use client";
import React, { ReactNode, useCallback, useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import { usePresenceChannel } from "@/hooks/usePresenceChannel";
import { useNotificationChannel } from "@/hooks/useNotificationChannel";
import useMessageStore from "@/hooks/useMessageStore";
import { getUnreadMessageCount } from "@/app/actions/messageActions";

export default function Providers({
  children,
  userId,
  profileComplete,
}: {
  children: ReactNode;
  userId: string | null;
  profileComplete: boolean;
}) {
  const updateUnreadCount = useMessageStore((state) => state.updateUnreadCount);

  const setUnreadCount = useCallback(
    (amount: number) => {
      updateUnreadCount(amount);
    },
    [updateUnreadCount]
  );

  useEffect(() => {
    if (userId) {
      getUnreadMessageCount().then((count) => setUnreadCount(count));
    }
  }, [setUnreadCount, userId]);

  usePresenceChannel(userId, profileComplete);
  useNotificationChannel(userId, profileComplete);
  return (
    <NextUIProvider>
      <ToastContainer position="bottom-right" hideProgressBar={true} />
      {children}
    </NextUIProvider>
  );
}
