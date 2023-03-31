import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { pickProblem } from '../../store/tools'
import { openModal } from '../../redux/features/modalSlice'

export const UtilityBar = () => {
  const { problems, review } = useAppSelector(state => state.table)
  const dispatch = useAppDispatch()
  const [disableCheckbox, setDisableCheckbox] = useState(!review)
  const [reviewEnabled, setReviewEnabled] = useState(false)

  useEffect(() => {
    setDisableCheckbox(!review)
  }, [review])

  const handleReviewChange = () => {
    setReviewEnabled(!reviewEnabled)
  }

  const handlePick = () => {
    const pick = pickProblem(reviewEnabled, review)
    dispatch(openModal(problems[pick]))
  }

  return (
    <span style={{ alignSelf: 'end' }}>
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
  )
}
