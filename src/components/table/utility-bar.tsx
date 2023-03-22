import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { ProblemsObject, ReviewModel } from '../../store/interfaces'
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn'
import { useAppDispatch } from '../../redux/hooks'
import { pickProblem } from '../../store/tools'
import { openModal } from '../../redux/features/modalSlice'

interface UtilityBarProp {
  problems: ProblemsObject,
  review?: ReviewModel
}

export const UtilityBar = ({ problems, review }: UtilityBarProp) => {
  const [disableCheckbox, setDisableCheckbox] = useState(!review)
  const [reviewEnabled, setReviewEnabled] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setDisableCheckbox(!review)
  }, [review])

  const handleReviewChange = () => {
    setReviewEnabled(!reviewEnabled)
  }

  const handlePick = () => {
    const pick = pickProblem(problems, reviewEnabled, review)
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
