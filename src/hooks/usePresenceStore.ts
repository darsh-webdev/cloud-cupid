import { create } from "zustand";
import { devtools } from "zustand/middleware";

type PresenceState = {
  membersId: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  setMembersId: (ids: string[]) => void;
};

const usePresenceStore = create<PresenceState>()(
  devtools(
    (set) => ({
      membersId: [],
      add: (id) => set((state) => ({ membersId: [...state.membersId, id] })),
      remove: (id) =>
        set((state) => ({
          membersId: state.membersId.filter((memberId) => memberId !== id),
        })),
      setMembersId: (ids) => set({ membersId: ids }),
    }),
    { name: "PresenceStoreDemo" }
  )
);

export default usePresenceStore;
