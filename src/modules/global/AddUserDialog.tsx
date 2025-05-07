import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import firebaseHelper from "@/lib/firebase/FirebaseDB"
import { TUser } from "@/type"
import { FC, useState } from "react"
// @ts-expect-error: import error
import QRCode from 'qrcode'
import firebaseStorage from "@/lib/firebase/FirebaseStorage"
import userStore from "@/store"
import {status} from "@/constants"

const AddUserDialog: FC = () => {
  const [user, setUser] = useState<TUser>({
    email: "",
    name: "",
    status: status.NON_CHECK_IN,
    qrLink: "",
    id: crypto.randomUUID()
  })
  const {fetchUsers} = userStore(state=>state)
  const handleAddUser = async () => {
    if (!!user.email && !!user.name) {
      const usersNoExist = await firebaseHelper.userNoExist([user])
      if (usersNoExist.length) {
        const userNoExist = usersNoExist[0] 
        const canvas = await QRCode.toCanvas(userNoExist.email)
        const blob = await new Promise((resolve) => canvas.toBlob(resolve))
        const urlImg = await firebaseStorage.getImgUrlFromFb(blob as Blob, userNoExist.email)
        await firebaseHelper.addUser({...userNoExist,status:status.NON_CHECK_IN,qrLink:urlImg})
        await fetchUsers()
      } else {
        alert("user is exist")
      }
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add user</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>
            Add new user here for faster !!!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Email
            </Label>
            <Input id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button onClick={() => handleAddUser()}>Add</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddUserDialog