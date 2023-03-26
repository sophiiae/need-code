import { useState, KeyboardEvent } from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { getPidfromIput } from '../../store/tools'
import { updateProblem } from '../../firebase/useDatabase'
import { KeyCode } from '../../store/enum'
import { ProblemsObject } from '../../store/interfaces'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { CardActions, CardContent } from '@mui/material'
import { ErrorText } from '../index'

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
})

interface ProblemSettingCardProp {
  user: any,
  problems: ProblemsObject
}

export const ProblemSettingCard = ({ user, problems }: ProblemSettingCardProp) => {
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleAdd = () => {
    const { pid, err } = getPidfromIput(value)
    if (pid) {
      setValue('')
      updateProblem(user.uid, pid, problems[pid])
    } else {
      setError(err)
    }
  }

  const handleReset = () => {
    const { pid, err } = getPidfromIput(value)
    if (pid) {
      updateProblem(user.uid, pid, problems[pid], true)
    } else {
      setError(err)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === KeyCode.ENTER) {
      handleAdd()
    }
    return
  }

  return (
    <Card sx={{ ml: 2, minWidth: 340, minHeight: 200 }}>
      <Typography sx={{ mt: 2, ml: 2, fontWeight: 600 }}>
        Problem Review Setting
      </Typography>
      <CardContent>
        <CustomTextField
          label="Problem ID"
          id='problem-setting-input'
          fullWidth
          error={!!error}
          onChange={e => {
            setError('')
            setValue(e.target.value)
          }}
          value={value}
          onKeyDown={handleKeyDown} />
        <ErrorText message={error} />
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          color='success'
          sx={{ m: 1 }}
          onClick={handleReset}>
          Reset
        </Button>
        <Button
          variant="contained"
          color='primary'
          sx={{ m: 1 }}
          onClick={handleAdd}>
          Add
        </Button>
      </CardActions>
    </Card>
  )
}
