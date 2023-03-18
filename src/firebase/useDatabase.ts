import { ref, set, get, child, update, remove } from "firebase/database"
import { db } from './config'
import { ProblemModel, UserDataModel } from '../store/interfaces' 

export const writeData = (uid: string, data: UserDataModel) => {
  set(ref(db, 'users/' + uid), data)
   .catch(err => console.error(err))
}

export const getData = async(uid: string) => {
  const snapshot = await get(child(ref(db), `users/${uid}`))
  // return { problems: {...} }
  if (snapshot.exists()) {
    return snapshot.val()
  }
  return {}
}

export const updateProblem = (uid: string, pid: string, data: ProblemModel) => {
  const probRef = ref(db, `users/${uid}/problems/${pid}`)
  update(probRef, data).catch(err => console.error(err))
}

export const deleteUserData = (uid: string) => {
  const userRef = ref(db, `users/${uid}`)
  remove(userRef)
}
