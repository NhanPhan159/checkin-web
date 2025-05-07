import firebaseHelper from "@/lib/firebase/FirebaseDB";
import { TUser } from "@/type";
import { useEffect, useState } from "react";
import {useParams } from "react-router-dom";

const User = () => {
  const {id} = useParams();
  const [checkinInfor,setCheckinInfor] = useState<Partial<TUser>>()
  const updateUser = async ()=>{
    if(id){
      const userUpdated = await firebaseHelper.updateUser(id)
      if (userUpdated) {
        setCheckinInfor(userUpdated)
      }
    }
  }
  useEffect(()=>{
    updateUser()
  },[])
  return ( 
    <>
      {checkinInfor && <>
        <p>{checkinInfor.name}</p>
        <p>{checkinInfor.email}</p>
        <p>Status: {checkinInfor.status}</p>
        </>} 
    </>

   );
}
 
export default User;