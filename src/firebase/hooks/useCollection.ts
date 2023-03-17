import { collection, getDocs, setDoc, doc } from 'firebase/firestore'
import { db } from '../config'
import { parseKeyToString } from '../helper'
import { problems } from '../../assets/problems'
import { ProblemModel } from '../../store/interfaces'

// Get a list of problems from your database
export const getProblems = async () => {
  const problems = collection(db, 'Problems')
  const snapshot = await getDocs(problems)
  const data = snapshot.docs.map(doc => doc.data())
  const list: ProblemModel[] = data.map(item => ({
    id: item.id,
    title: item.title,
    url: item.url,
    difficulty: item.difficulty,
    paidOnly: item.paidOnly,
    favor: item.favor,
    solved: item.solved,
    lastSubmit: item.lastSubmit,
    visited: item.visited,
    noteUrl: item.noteUrl,
  }))

  return list
}

export const setProblem = async (key: number, problem: any) => {
  await setDoc(doc(db, 'Problems', parseKeyToString(key)), problem)
}

export const refreshAllProblems = async () => {
  problems.forEach(async (prob) => {
    await setProblem(prob.id, prob)
    console.log('finished: #', prob.id)
  })
}
