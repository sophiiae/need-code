import { useState } from 'react'
import Box from '@mui/material/Box'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import { CardTemplate } from '../index'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { problems as original } from '../../assets/problems'
import { updateAllProblems } from '../../redux/features/tableSlice'
import LinearProgress from '@mui/material/LinearProgress'
import packageJson from '../../../package.json'
import { updateVersion } from '../../redux/features/userSlice'
import { contents } from '../../assets/contents'
import { writeSubData } from '../../firebase/useDatabase'

export const UpdateNotificationCard = () => {
  const [updating, setUpdating] = useState(false)
  const userSettings = useAppSelector(state => state.user)
  const { problems } = useAppSelector(state => state.table)
  const dispatch = useAppDispatch()

  if (!!userSettings.version) return <></>

  const VersionUpdateDetails = () => (
    <Box sx={{ m: 2, mb: 0 }}>
      <ul>
        <li>Fix outdated question link</li>
        <li>Show non-Premium question content on Modal</li>
      </ul>
      {updating && <LinearProgress sx={{ mt: 3 }} />}
    </Box>
  )

  const handleUpdate = () => {
    setUpdating(true)
    const updatedProblems: any = {}
    for (const key in problems) {
      const text = contents[key] ? contents[key] : ''
      if (key === '2086') {
        updatedProblems[key] = { ...original[key], content: text }
      } else {
        updatedProblems[key] = { ...problems[key], content: text }
      }
    }
    // Update the problems
    writeSubData(userSettings.id, 'problems', updatedProblems)
    dispatch(updateAllProblems(updatedProblems))

    // Update user settings
    writeSubData(userSettings.id, 'settings', {
      username: userSettings.username,
      version: packageJson.version
    })
    dispatch(updateVersion(packageJson.version))
    setUpdating(false)
  }

  return (
    <CardTemplate
      titleIcon={<NotificationsActiveIcon fontSize='small' sx={{ color: '#ffb703', verticalAlign: 'top', mr: 0.5 }} />}
      title='Update to v0.2.0'
      content={<VersionUpdateDetails />}
      rightButtonLabel={updating ? '' : 'Update'}
      rightButtonClickHandle={handleUpdate}
    />
  )
}
