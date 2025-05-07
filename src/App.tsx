import * as React from 'react'
import './index.css'

import { Input } from './components/ui/input'
import readXlsxFile from 'read-excel-file'
import firebaseHelper from './lib/firebase/FirebaseDB'
import AddUserDialog from './modules/global/AddUserDialog'
import firebaseStorage from './lib/firebase/FirebaseStorage'
// @ts-expect-error: import error
import QRCode from 'qrcode'
import { TUser } from './type'
import { columns, DataTable } from './modules/User'
import userStore from './store'
import { BASE_URL, status } from './constants'
import { onSnapshot } from 'firebase/firestore'
import { Button } from './components/ui/button'
import Loading from './modules/global/Loading'



const schemaExcel = {
  'name': {
    prop: 'name',
    type: String
  },
  'email': {
    prop: 'email',
    type: String
  },
}

export default function App() {

  const fileRef = React.useRef<HTMLInputElement>(null)
  const [isLoading,setIsLoading] = React.useState(false)
  const { users, fetchUsers } = userStore(state => state)
  const postBunchUsers = async (data: TUser[]) => {
    await firebaseHelper.addBunchUsers(data)
  }
  const handleUploadExcel = async (data: any[]) => {
    data = data.map(curr=>({...curr,id: crypto.randomUUID()}))
    const userNoExist = await firebaseHelper.userNoExist(data)
    if (userNoExist.length) {
      for (let i = 0; i < userNoExist.length; i++) {
        const canvas = await QRCode.toCanvas(`${BASE_URL}/users/${userNoExist[i].id}`, { width: 500 })
        const blob = await new Promise((resolve) => canvas.toBlob(resolve))
        const urlImg = await firebaseStorage.getImgUrlFromFb(blob as Blob, userNoExist[i].id)
        userNoExist[i].qrLink = urlImg
        userNoExist[i].status = status.NON_CHECK_IN
      }
      setIsLoading(true)
      await postBunchUsers(userNoExist)
      await fetchUsers()
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    (async () => {
      setIsLoading(true)
      await fetchUsers()
      onSnapshot(firebaseHelper.queryValue, async () => {
        setIsLoading(true)
        await fetchUsers()
        setIsLoading(false)
      })
      setIsLoading(false)
    })()
  }, [])
  return (

    <div className='grid grid-cols-1 gap-y-10 m-5'>
      <div className='flex gap-8'>
        <div>
          <Input type='file' accept='.xlsx' ref={fileRef}
            onChange={(e) => e.target.files &&
              readXlsxFile(e.target?.files[0], { schema: schemaExcel })
                .then(async ({ rows }) => {
                  await handleUploadExcel(rows)
                })
            } className='w-56 hidden' />
          <Button variant={"default"} onClick={() => fileRef.current?.click()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
            </svg>
            Upload
          </Button>
        </div>

        <AddUserDialog />
      </div>
      <DataTable data={users} columns={columns} />
      {isLoading && <Loading/>}
    </div>
  )
}
