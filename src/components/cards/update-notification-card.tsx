import { useState } from 'react'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import { CardTemplate } from '../index'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { updateAllProblems } from '../../redux/features/tableSlice'
import LinearProgress from '@mui/material/LinearProgress'
import packageJson from '../../../package.json'
import { updateVersion } from '../../redux/features/userSlice'
import { getData, writeSubData } from '../../firebase/useDatabase'
import { getFormattedDate } from '../../store/tools'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'

export const UpdateNotificationCard = () => {
  const [updating, setUpdating] = useState(false)
  const userSettings = useAppSelector(state => state.user)
  const { problems } = useAppSelector(state => state.table)
  const dispatch = useAppDispatch()
  const id = process.env.REACT_APP_TEST_USER

  if (!!userSettings.version || !id) return <></>

  const VersionUpdateDetails = () => (
    <CardContent sx={{ m: 2, mb: 0 }}>
      <ul>
        <li>Fix outdated question link</li>
        <li>Fix <code>LastSubmit</code> order issue</li>
        <li>Upgrade Modal to include non-Premium question content</li>
        <li>Enable <code>Enter</code> keyboard shortcut for submit Login/Signup Form and Problem Review Setting</li>
      </ul>
      {updating && <LinearProgress sx={{ mt: 3 }} />}
    </CardContent>
  )

  const handleUpdate = async () => {
    setUpdating(true)
    const data = await getData(id)
    const original = data.problems

    const updatedProblems: any = {}
    for (const key in problems) {
      const dateString = problems[key].lastSubmit
      const formattedString = dateString ? getFormattedDate(new Date(dateString)) : dateString

      if (key === '2086') {
        // fix outdated question
        updatedProblems[key] = {
          ...original[key],
          lastSubmit: formattedString
        }
      } else {
        updatedProblems[key] = {
          ...problems[key],
          content: original[key].content,
          lastSubmit: formattedString
        }
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
      titleIcon={
        <NotificationsActiveIcon
          fontSize='small'
          sx={{ color: '#ffb703', verticalAlign: 'top', mr: 0.5 }}
        />}
      title='Update to v0.2.0'
    >
      <VersionUpdateDetails />
      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color='primary'
          sx={{ m: 1 }}
          onClick={handleUpdate}>
          Add
        </Button>
      </CardActions>
    </CardTemplate>
  )
}
