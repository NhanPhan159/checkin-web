import { create } from "zustand";
import { TTableField, TUser } from "./type";
import firebaseHelper from "./lib/firebase/FirebaseDB";

type State = {
  users: TUser[];
  tableFields: TTableField[] | null;
  isLoading: boolean;
};
type Action = {
  fetchUsers: () => Promise<void>;
  fetchTableFields: () => Promise<void>;
  setLoading: (value: boolean) => void;
};

const useGlobalStore = create<State & Action>((set) => ({
  users: [],
  tableFields: null,
  isLoading: false,
  fetchUsers: async () => {
    const users = await firebaseHelper.getUsers();
    set(() => ({ users: users }));
    return;
  },
  fetchTableFields: async () => {
    const tableFields = await firebaseHelper.getTableFields();
    set(() => ({ tableFields: tableFields }));
    return;
  },
  setLoading: (value) => set(() => ({ isLoading: value })),
}));

export default useGlobalStore;
