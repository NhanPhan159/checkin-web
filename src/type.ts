import { status } from "./constants";

export type TUser = {
  FullName: string;
  CompanyName: string;
  // branch: string;
  status: status;
  qrLink: string;
  qr: string;
  id: string;
  email: string;
  avatar: string;
  sex: "female" | "male";
  phone: string;
};

export type TTableField = {
  columnName: string;
  prop: string;
  require: boolean;
};
