import { ref, set, get, child, update, remove } from "firebase/database"
import { db } from './config'
import { ProblemModel, UserDataModel } from '../store/interfaces'
import { getCurrentDateString } from '../store/tools'

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
export const getData = async (uid: string) => {
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
 * @param reset - reset the problem. Default: false
 */
export const updateProblem = async (
  uid: string,
  pid: number,
  data: ProblemModel,
  reset: boolean = false
) => {
  // update problem object
  const probRef = ref(db, `users/${uid}/problems/${pid}`)
  if (reset) {
    // reset problem to original state
    update(probRef, {
      ...data,
      solved: 0,
      lastSubmit: '1/1/2001',
    }).catch(err => console.error(err))

    // remove problem from review pool
    deleteFromReview(uid, pid)
    return
  }

  // update problem with current data state
  update(probRef, {
    ...data,
    solved: data.solved + 1,
    lastSubmit: getCurrentDateString()
  }).catch(err => console.error(err))
  updateReview(uid, pid, data.solved)
}

/**
 * Update review map
 * @param uid - user id
 * @param pid - problem id
 * @param solved - # of problem solved
 */
export const updateReview = async (uid: string, pid: number, solved: number) => {
  // update review map
  const reviewRef = ref(db, `users/${uid}/review`)
  const snapshot = await get(reviewRef)
  const review = snapshot.val()
  const newMap = { ...review }
  newMap[pid] = solved
  update(reviewRef, newMap)
}

export const deleteFromReview = async (uid: string, pid: number) => {
  const problemRef = ref(db, `users/${uid}/review/${pid}`)
  remove(problemRef)
}

/**
 * Delete all data of specified user
 * @param uid - user id
 */
export const deleteUserData = (uid: string) => {
  const userRef = ref(db, `users/${uid}`)
  remove(userRef)
}
