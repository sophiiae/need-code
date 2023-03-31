import { useEffect } from 'react'
import { UserProfileModel } from '../store/interfaces'
import { ProblemTable, LoadingCircle, UtilityBar, ProblemSettingCard } from './index'
import Box from '@mui/material/Box'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addUsername } from '../redux/features/userSlice'
import { getData } from '../firebase/useDatabase'
import { updateProblems, updateReview } from '../redux/features/tableSlice'

interface ContentWrapperProp {
  state: UserProfileModel
}

export const ContentWrapper = ({ state }: ContentWrapperProp) => {
  const dispatch = useAppDispatch()
  const { problems } = useAppSelector(state => state.table)

  useEffect(() => {
    getData(state.user.uid).then(data => {
      dispatch(updateProblems(data.problems))
      dispatch(updateReview(data.review))
      dispatch(addUsername(data.settings.username))
    })
  }, [state.user.uid, dispatch])

  if (!problems) return <LoadingCircle />

  return (
    <div style={{ display: 'flex', justifyContent: 'space-round' }}>
      <Box sx={{ m: 2, display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
        <UtilityBar />
        <ProblemTable />
      </Box>
      <Box sx={{ m: 2 }}>
        <ProblemSettingCard user={state.user} problems={problems} />
      </Box>
    </div>
  )
}
