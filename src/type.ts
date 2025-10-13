import { status } from "./constants";

export type TUser = {
  name: string;
  type: string;
  branch: string;
  status: status;
  qrLink: string;
  qr: string;
  id: string;
};
