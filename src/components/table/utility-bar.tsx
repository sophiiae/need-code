import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { pickProblem } from '../../store/tools'
import { openModal } from '../../redux/features/modalSlice'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { TableFilter } from '../index'
import { StatusFilterValues, TableFilterType } from '../../store/enum'
import { clearFilters, setFilters } from '../../redux/features/tableSlice'

const difficultyFilterItems = [
  { value: '1', label: 'Easy', color: '#6a994e' },
  { value: '2', label: 'Medium', color: '#ffb703' },
  { value: '3', label: 'Hard', color: '#bc4749' },
]

const statusFilterItems = [
  { value: StatusFilterValues.FAVOR, label: StatusFilterValues.FAVOR, disable: true },
  { value: StatusFilterValues.PREMIUM, label: StatusFilterValues.PREMIUM },
  { value: StatusFilterValues.SOLVED, label: StatusFilterValues.SOLVED },
]

export const UtilityBar = () => {
  const { problems, review } = useAppSelector(state => state.table)
  const dispatch = useAppDispatch()
  const [disableCheckbox, setDisableCheckbox] = useState(!review)
  const [reviewEnabled, setReviewEnabled] = useState(false)
  const [difficultyFilter, setDifficultyFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

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

  const handleDifficultyFilter = (value: string) => {
    setDifficultyFilter(value)
    if (!value) {
      dispatch(clearFilters())
      return
    }
    dispatch(setFilters({ [TableFilterType.DIFFICULTY]: value }))
  }

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value)
    if (!value) {
      dispatch(clearFilters())
      return
    }
    dispatch(setFilters({ [TableFilterType.STATUS]: value }))

  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Stack direction='row' spacing={1} sx={{ pl: 2 }}>
        <TableFilter
          title={TableFilterType.DIFFICULTY}
          value={difficultyFilter}
          items={difficultyFilterItems}
          handleChange={handleDifficultyFilter}
        />
        <TableFilter
          title={TableFilterType.STATUS}
          value={statusFilter}
          items={statusFilterItems}
          handleChange={handleStatusFilter}
        />
      </Stack>
      <Stack direction='row'>
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
      </Stack>
    </Box>
  )
}
