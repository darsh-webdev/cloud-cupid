import React from "react";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import ChatForm from "./ChatForm";

export default function ChatPage() {
  return <CardInnerWrapper header="Chat" body={<ChatForm />} />;
}
