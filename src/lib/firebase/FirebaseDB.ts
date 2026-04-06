import { firebaseConfigDB, status } from "@/constants";
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
  updateTableField: async (data: TTableField[]): Promise<string> => {
    const tableFieldsPromise = data.map((tableField) => {
      const queryUser = query(tableFieldCol, where("id", "==", tableField.id));
      return getDocs(queryUser).then((querySnapshot) =>
        updateDoc(querySnapshot.docs[0].ref, tableField),
      );
    });
    const a = await Promise.all(tableFieldsPromise);
    console.log("Update to firebase : ", a);
    return "";
  },

  addTableField: async (data: TTableField[]) => {
    const tableFieldsPromise = data.map((tableField) => {
      return addDoc(tableFieldCol, tableField);
    });
    Promise.all(tableFieldsPromise).then(() => console.log("Save to firebase"));
  },
  getTableFields: async (): Promise<TTableField[] | null> => {
    const tableFieldSnapshot = await getDocs(tableFieldCol);
    const tableFields = tableFieldSnapshot.docs.map((doc) => doc.data());
    if (tableFields.length) return tableFields as TTableField[];
    return null;
  },
  getUsers: async (): Promise<TUser[]> => {
    const userSnapshot = await getDocs(userCol);
    const userList = userSnapshot.docs.map((doc) => doc.data());
    return userList as TUser[];
  },
  userNoExist: async (data: TUser[]) => {
    const userDb = await firebaseHelper.getUsers();
    const userNoExist = data.filter(
      (curr) => !userDb.some((cur) => cur.FullName === curr.FullName),
    );
    console.log(userNoExist);
    return userNoExist;
  },
  addBunchUsers: async (userNoExist: TUser[]) => {
    const userPromise = userNoExist.map((user) => {
      return addDoc(userCol, user);
    });
    Promise.all(userPromise).then(() => console.log("Save to firebase"));
  },
  addUser: async (data: TUser) => {
    await addDoc(userCol, data);
  },
  // updateUser: async (idUser: string): Promise<Partial<TUser> | null> => {
  //   const users = await firebaseHelper.getUsers();

  //   console.log(users);

  //   if (idUser) {
  //     const isExistUsers = users.some((user) => user.id === idUser);
  //     if (isExistUsers) {
  //       const queryUser = query(userCol, where("id", "==", idUser));
  //       const querySnapshot = await getDocs(queryUser);
  //       await updateDoc(querySnapshot.docs[0].ref, { status: status.CHECK_IN });
  //       console.log("updated", {
  //         ...querySnapshot.docs[0].data,
  //         status: status.CHECK_IN,
  //       });

  //       return { ...querySnapshot.docs[0].data, status: status.CHECK_IN };
  //     }
  //   }
  //   return null;
  // },
  getUserById: async (idUser: string): Promise<TUser | null> => {
    const users = await firebaseHelper.getUsers();
    if (idUser) {
      const isExistUsers = users.filter((user) => user.id === idUser);
      return isExistUsers[0];
    }
    return null;
  },
  queryValue: query(userCol, where("status", "==", status.CHECK_IN)),
};

export default firebaseHelper;
