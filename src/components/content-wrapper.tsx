import { useEffect } from 'react'
import { UserProfileModel } from '../store/interfaces'
import { ProblemTable, LoadingCircle, UtilityBar, ProblemSettingCard, UpdateNotificationCard } from './index'
import Box from '@mui/material/Box'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addUserId, addUsername, updateVersion } from '../redux/features/userSlice'
import { getData } from '../firebase/useDatabase'
import { updateAllProblems, updateAllReview } from '../redux/features/tableSlice'

interface ContentWrapperProp {
  state: UserProfileModel
}

export const ContentWrapper = ({ state }: ContentWrapperProp) => {
  const dispatch = useAppDispatch()
  const { problems } = useAppSelector(state => state.table)

  useEffect(() => {
    getData(state.user.uid).then(data => {
      dispatch(updateAllProblems(data.problems))
      dispatch(updateAllReview(data.review))
      dispatch(addUserId(state.user.uid))
      dispatch(addUsername(data.settings.username))
      dispatch(updateVersion(data.settings.version))
    })
  }, [state.user.uid, dispatch])

  if (Object.keys(problems).length === 0) return <LoadingCircle />

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ m: 2, display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
        <UtilityBar />
        <ProblemTable />
      </Box>
      <Box sx={{ m: 2 }}>
        <UpdateNotificationCard />
        <ProblemSettingCard user={state.user} />
      </Box>
    </div>
  )
}
