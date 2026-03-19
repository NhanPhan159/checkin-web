import avatar1 from "@/assets/imgs/avatar1.jpg";
import avatar2 from "@/assets/imgs/avatar2.jpg";
import avatar3 from "@/assets/imgs/avatar3.jpg";
const LIST_AVATAR = [avatar1, avatar2, avatar3];
const Utils = {
  getRamdonAvatarIndex: (): number => {
    const listSize = LIST_AVATAR.length;
    const randomIndex = Math.floor(Math.random() * listSize);
    return randomIndex;
  },
  getAvaterByIndex: (index: number) => {
    return LIST_AVATAR[index];
  },
};
export default Utils;
