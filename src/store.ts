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
    try {
      const users = await firebaseHelper.getUsers();
      set(() => ({ users: users }));
      return;
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      } else throw Error("Something error in store fetchUsers ");
    }
  },
  fetchTableFields: async () => {
    try {
      const tableFields = await firebaseHelper.getTableFields();
      set(() => ({ tableFields: tableFields }));
      return;
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      } else throw Error("Something error in store fetchTableFields ");
    }
  },
  setLoading: (value) => set(() => ({ isLoading: value })),
}));

export default useGlobalStore;
