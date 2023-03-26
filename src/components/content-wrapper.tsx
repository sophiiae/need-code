import { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'

import { db } from '../firebase/config'
import { ProblemModel, ProblemsObject, ReviewModel, UserProfileModel } from '../store/interfaces'
import { ProblemTable, LoadingCircle, UtilityBar, ProblemSettingCard } from './index'
import Box from '@mui/material/Box'
import { useAppDispatch } from '../redux/hooks'
import { addUsername } from '../redux/features/userSlice'

interface ContentWrapperProp {
  state: UserProfileModel
}

export const ContentWrapper = ({ state }: ContentWrapperProp) => {
  const [problems, setProblems] = useState<ProblemsObject>()
  const [list, setList] = useState<ProblemModel[]>([])
  const [review, setReview] = useState<ReviewModel>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const userRef = ref(db, `users/${state.user.uid}`)
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val()
      setProblems(userData.problems)
      setList(Object.values(userData.problems))
      setReview(userData.review)
      dispatch(addUsername(userData.settings ? userData.settings.username : ''))

      // Avoid browser listener error
      return true
    })
  }, [state.user.uid, dispatch])

  if (!problems) return <LoadingCircle />

  return (
    <div style={{ display: 'flex', justifyContent: 'space-round' }}>
      <Box sx={{ m: 2, display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
        <UtilityBar problems={problems} review={review} />
        <ProblemTable problems={list} />
      </Box>
      <Box sx={{ m: 2 }}>
        <ProblemSettingCard user={state.user} problems={problems} />
      </Box>
    </div>
  )
}
