import { ref, set, get, child, update, remove } from "firebase/database"
import { db } from './config'
import { ProblemModel, UserDataModel } from '../store/interfaces' 

/**
 * Write / update whole user data
 */
export const writeData = (uid: string, data: UserDataModel) => {
  set(ref(db, 'users/' + uid), data)
   .catch(err => console.error(err))
}

/**
 * Get user data once
 * @param uid - user id
 * @returns 
 */
export const getData = async(uid: string) => {
  const snapshot = await get(child(ref(db), `users/${uid}`))
  // return { problems: {...} }
  if (snapshot.exists()) {
    return snapshot.val()
  }
  return {}
}

/**
 * Update single problem
 * @param uid - user id
 * @param pid - problem id
 * @param data - updated data
 */
export const updateProblem = async(uid: string, pid: number, data: ProblemModel) => {
  // update problem object
  const probRef = ref(db, `users/${uid}/problems/${pid}`)
  update(probRef, data).catch(err => console.error(err))
  updateReview(uid, pid, data.solved)
}

/**
 * Update review map
 * @param uid - user id
 * @param pid - problem id
 * @param solved - # of problem solved
 */
export const updateReview = async(uid: string, pid: number, solved: number) => {
    // update review map
    const reviewRef = ref(db, `users/${uid}/review`)
    const snapshot = await get(reviewRef)
    const review = snapshot.val()
    const newMap = {...review}
    newMap[pid] = solved
    update(reviewRef, newMap)
}

/**
 * Delete all data of specified user
 * @param uid - user id
 */
export const deleteUserData = (uid: string) => {
  const userRef = ref(db, `users/${uid}`)
  remove(userRef)
}
