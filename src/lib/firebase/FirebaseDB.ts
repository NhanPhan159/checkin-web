import { firebaseConfigDB, status } from "@/constants";
import useGlobalStore from "@/store";
import { TTableField, TUser } from "@/type";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const app = initializeApp(firebaseConfigDB);
const db = getFirestore(app);
const userCol = collection(db, "User");
const tableFieldCol = collection(db, "TableField");

const firebaseHelper = {
  updateTableField: async (data: TTableField[]): Promise<string> | never => {
    try {
      const tableFieldsPromise = data.map((tableField) => {
        const queryUser = query(
          tableFieldCol,
          where("id", "==", tableField.id),
        );
        return getDocs(queryUser).then((querySnapshot) =>
          updateDoc(querySnapshot.docs[0].ref, tableField),
        );
      });
      const a = await Promise.all(tableFieldsPromise);
      console.log("Update to firebase : ", a);
      return "";
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      } else throw Error("Something is wrong to this updateTableField");
    }
  },

  addTableField: async (data: TTableField[]) => {
    try {
      const tableFieldsPromise = data.map((tableField) => {
        return addDoc(tableFieldCol, tableField);
      });
      Promise.all(tableFieldsPromise).then(() =>
        console.log("Save to firebase"),
      );
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      } else throw Error("Something error in function addTableField");
    }
  },
  getTableFields: async (): Promise<TTableField[] | null> => {
    try {
      const tableFieldSnapshot = await getDocs(tableFieldCol);
      const tableFields = tableFieldSnapshot.docs.map((doc) => doc.data());
      if (tableFields.length) return tableFields as TTableField[];
      return null;
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      } else throw Error("Something error in function getTableFields");
    }
  },
  getUsers: async (): Promise<TUser[]> => {
    try {
      const userSnapshot = await getDocs(userCol);
      const userList = userSnapshot.docs.map((doc) => doc.data());
      return userList as TUser[];
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      } else throw Error("Something error in function getUsers");
    }
  },
  userNoExist: async (data: TUser[]) => {
    try {
      const userDb = await firebaseHelper.getUsers();
      const userNoExist = data.filter(
        (curr) => !userDb.some((cur) => cur.FullName === curr.FullName),
      );
      console.log(userNoExist);
      return userNoExist;
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      } else throw Error("Something error in function userNoExist");
    }
  },
  addBunchUsers: async (userNoExist: TUser[]) => {
    try {
      const userPromise = userNoExist.map((user) => {
        return addDoc(userCol, user);
      });
      Promise.all(userPromise).then(() => console.log("Save to firebase"));
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      } else throw Error("Something error in function addBunchUsers");
    }
  },
  addUser: async (data: TUser) => {
    try {
      await addDoc(userCol, data);
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      } else throw Error("Something error in function addBunchUsers");
    }
  },
  updateUser: async (idUser: string): Promise<Partial<TUser> | null> => {
    try {
      const users = await firebaseHelper.getUsers();
      if (idUser) {
        const isExistUsers = users.some((user) => user.id === idUser);
        if (isExistUsers) {
          const queryUser = query(userCol, where("id", "==", idUser));
          const querySnapshot = await getDocs(queryUser);
          await updateDoc(querySnapshot.docs[0].ref, {
            status: status.CHECK_IN,
          });
          console.log("updated", {
            ...querySnapshot.docs[0].data,
            status: status.CHECK_IN,
          });

          return { ...querySnapshot.docs[0].data, status: status.CHECK_IN };
        }
      }
      return null;
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      } else throw Error("Something error in function updateUser");
    }
  },
  getUserById: async (idUser: string): Promise<TUser | null> => {
    try {
      const users = await firebaseHelper.getUsers();
      if (idUser) {
        const isExistUsers = users.filter((user) => user.id === idUser);
        return isExistUsers[0];
      }
      return null;
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      } else throw Error("Something error in function getUserById");
    }
  },
  queryValue: query(userCol, where("status", "==", status.CHECK_IN)),
};

export default firebaseHelper;
