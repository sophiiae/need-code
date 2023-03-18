import { ref, set, get, child } from "firebase/database"
import { db } from './config'
import { UserDataModel } from '../store/interfaces' 

export const writeData = (uid: string, data: UserDataModel) => {
  set(ref(db, 'users/' + uid), data)
}

export const getData = async(uid: string) => {
  const snapshot = await get(child(ref(db), `users/${uid}`))
  // return { problems: {...} }
  if (snapshot.exists()) {
    return snapshot.val()
  }
  return {}
}
