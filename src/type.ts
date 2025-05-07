import {status} from "./constants"

export type TUser = {
  name: string,
  email: string,
  status: status,
  qrLink: string
  id: string
}