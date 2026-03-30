import { status } from "./constants";

export type TBaseUserInfor = {
  status: status;
  qrLink: string;
  qr: string;
  id: string;
  email: string;
  avatar: string;
};
export type TUser = TBaseUserInfor & Record<string, string | number>;

export type TTableField = {
  columnName: string;
  prop: string;
  require: boolean;
};
