import { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { onValue, ref } from 'firebase/database'

import { AuthContext } from '../context/authContext'
import { db } from '../firebase/config'
import { ProblemModel, ProblemsObject, ReviewModel } from '../store/interfaces'
import { ProblemTable, LoadingCircle } from './index'
import { updateProblem } from '../firebase/useDatabase'
import { getCurrentDateString, pickProblem } from '../store/tools'
import { useAppDispatch } from '../redux/hooks'
import { openModal } from '../redux/features/modalSlice'

export const CustomTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'black',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'black',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'grey',
    },
    '&:hover fieldset': {
      borderColor: 'grey',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black',
    },
  },
});

export const MainContentWrapper = () => {
  const [data, setData] = useState<ProblemsObject>()
  const [list, setList] = useState<ProblemModel[]>([])
  const [review, setReview] = useState<ReviewModel>()
  const [disableCheckbox, setDisableCheckbox] = useState(true)
  const [reviewEnabled, setReviewEnabled] = useState(false)
  const { state } = useContext(AuthContext)
  const [value, setValue] = useState<string>()
  const [error, setError] = useState<string>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const userRef = ref(db, `users/${state.user.uid}`)
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val()
      setData(userData.problems)
      setList(Object.values(userData.problems))
      setReview(userData.review)
      setDisableCheckbox(userData.review ? false : true)
    })
  }, [])

  if (!data) return <LoadingCircle />

  const handleReviewChange = () => {
    setReviewEnabled(!reviewEnabled)
  }

  const handleAdd = () => {
    if (!value) {
      setError('Error: no input value.')
      return
    }

    const validId = new RegExp('^[1-9][0-9]*$')
    if (validId.test(value)) {
      const pid = parseInt(value)
      if (pid <= 0 || pid > 2436) {
        setError('Error: invalid input.')
        return
      }
      setValue('')
      updateProblem(state.user.uid, pid, {
        ...data[pid],
        solved: data[pid].solved + 1,
        lastSubmit: getCurrentDateString()
      })
    } else {
      setError('Error: invalid input.')
    }
  }

  const handlePick = () => {
    const pick = pickProblem(data, reviewEnabled, review)
    dispatch(openModal(data[pick]))
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex' }}>
          <Box sx={{ width: '300px', display: 'inline-block' }}>
            <CustomTextField
              label="Add problem for review"
              id='add-problem-review'
              fullWidth
              error={!!error}
              onChange={e => {
                setError('')
                setValue(e.target.value)}
              }
              value={value}
              helperText={error} />
          </Box>
          <Button
            variant="contained"
            color='inherit'
            sx={{ alignSelf: 'center', marginLeft: '20px' }}
            onClick={handleAdd}>
            Add
          </Button>
        </span>
        <span>
          <FormControlLabel
            value="review"
            control={
              <Checkbox
                onChange={handleReviewChange}
                checked={reviewEnabled}
                disabled={disableCheckbox} />
            }
            label="Review" />
          <Button
            variant="text"
            color='success'
            startIcon={<ShuffleOnIcon />}
            sx={{ alignSelf: 'center' }}
            onClick={handlePick}>
            Pick One
          </Button>
        </span>
      </div>
      <ProblemTable problems={list} />
    </div>
  )
}
