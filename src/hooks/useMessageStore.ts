import { MessageDto } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type MessageState = {
  messages: MessageDto[];
  unreadCount: number;
  add: (message: MessageDto) => void;
  setMessages: (messages: MessageDto[]) => void;
  remove: (id: string) => void;
  updateUnreadCount: (amount: number) => void;
  resetMessages: VoidFunction;
};

const useMessageStore = create<MessageState>()(
  devtools(
    (set) => ({
      messages: [],
      unreadCount: 0,
      add: (message) =>
        set((state) => ({ messages: [message, ...state.messages] })),
      remove: (id) =>
        set((state) => ({
          messages: state.messages.filter((message) => message.id !== id),
        })),
      setMessages: (messages) =>
        set((state) => {
          const map = new Map(
            [...state.messages, ...messages].map((m) => [m.id, m])
          );
          const uniqueMessages = Array.from(map.values());
          return { messages: uniqueMessages };
        }),
      updateUnreadCount: (amount: number) =>
        set((state) => ({ unreadCount: state.unreadCount + amount })),
      resetMessages: () => set({ messages: [] }),
    }),
    { name: "messagesStoreDemo" }
  )
);

export default useMessageStore;
