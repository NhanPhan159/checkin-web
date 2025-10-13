// import firebaseHelper from "@/lib/firebase/FirebaseDB";
// import useGlobalStore from "@/store";
// import { TUser } from "@/type";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

const User = () => {
  // const { id } = useParams();
  // const [checkinInfor, setCheckinInfor] = useState<Partial<TUser>>();
  // const { isLoading,setLoading } = useGlobalStore((state)=>state);
  // const updateUser = async () => {
  //   if (id) {
  //     const userUpdated = await firebaseHelper.updateUser(id);
  //     if (userUpdated) {
  //       setCheckinInfor(userUpdated);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   const func = async () => {
  //     try {
  //       setLoading(true);
  //       await updateUser();
  //     } catch (_err) {
  //       setLoading(false);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   func();
  // }, []);
  return (
    <>
      {/* {isLoading ? (
        <div>Loading</div>
      ) : checkinInfor ? (
        <>
          <p>{checkinInfor.name}</p>
          <p>{checkinInfor.type}</p>
          <p>{checkinInfor.branch}</p>
          <p>Status: {checkinInfor.status}</p>
        </>
      ) : (
        <div>Invalid user</div>
      )} */}
    </>
  );
};

export default User;
