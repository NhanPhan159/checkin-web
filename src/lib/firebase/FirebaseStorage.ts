import { firebaseConfigStorage } from "@/constants";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";


const app2 = initializeApp(firebaseConfigStorage,"app2");
const storage = getStorage(app2);
const firebaseStorage = {
  getImgUrlFromFb: async (data:Blob,email:string) => {
    const imgName = email
    console.log(data)
    const storageRef = ref(storage,imgName)
    const metadata = {
      contentType: "image/png",
    };

    const snapshot = await uploadBytes(storageRef,data,metadata)
    const imgUrl = await getDownloadURL(snapshot.ref)
    return imgUrl
  }
}

export default firebaseStorage;