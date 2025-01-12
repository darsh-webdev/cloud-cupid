"use client";
import React, { useCallback, useEffect, useState } from "react";
import { MessageDto } from "@/types";
import MessageBox from "./MessageBox";
import { pusherClient } from "@/lib/pusher";

type Props = {
  initialMessages: MessageDto[];
  currentUserId: string;
  chatId: string;
};

const MessageList = ({ initialMessages, currentUserId, chatId }: Props) => {
  const [messages, setMessages] = useState(initialMessages);

  const handleNewMessage = useCallback((message: MessageDto) => {
    setMessages((prevState) => [...prevState, message]);
  }, []);

  useEffect(() => {
    const channel = pusherClient.subscribe(chatId);
    channel.bind("message:new", handleNewMessage);

    return () => {
      channel.unsubscribe();
      channel.unbind("message:new", handleNewMessage);
    };
  }, [chatId]);

  return (
    <div>
      {messages.length === 0 ? (
        "No messages to display"
      ) : (
        <>
          {messages.map((message) => (
            <MessageBox
              key={message.id}
              message={message}
              currentUserId={currentUserId}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default MessageList;
