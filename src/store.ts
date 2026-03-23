import { create } from "zustand";
import { TUser } from "./type";
import firebaseHelper from "./lib/firebase/FirebaseDB";

type State = {
  users: TUser[];
  isLoading: boolean;
};
type Action = {
  fetchUsers: () => Promise<void>;
  setLoading: (value: boolean) => void;
};

const useGlobalStore = create<State & Action>((set) => ({
  users: [],
  isLoading: false,
  fetchUsers: async () => {
    const users = await firebaseHelper.getUsers();
    console.log(123, users);
    set(() => ({ users: users }));
    return;
  },
  setLoading: (value) => set(() => ({ isLoading: value })),
}));

export default useGlobalStore;
