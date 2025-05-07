import {create} from 'zustand'
import { TUser } from './type'
import firebaseHelper from './lib/firebase/FirebaseDB'

type State = {
  users: TUser[]
}
type Action = {
  fetchUsers: ()=>void 
}

const userStore = create<State & Action>((set)=>({
  users: [],
  fetchUsers: async ()=>{
    const users = await firebaseHelper.getUsers()
    console.log(123,users)
    set(()=>({users:users}))
  }
}))

export default userStore