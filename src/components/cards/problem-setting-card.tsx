import { useState, KeyboardEvent } from 'react'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { getPidfromIput } from '../../store/tools'
import { updateProblem } from '../../firebase/useDatabase'
import { KeyCode } from '../../store/enum'
import { ErrorText, CardTemplate } from '../index'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { resetSingleProblem, updateSingleProblem } from '../../redux/features/tableSlice'

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
}

export const ProblemSettingCard = ({ user }: ProblemSettingCardProp) => {
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<string>('')
  const { problems } = useAppSelector(state => state.table)
  const dispatch = useAppDispatch()

  const handleAdd = () => {
    const { pid, err } = getPidfromIput(value)
    if (pid) {
      setValue('')
      dispatch(updateSingleProblem(pid))
      updateProblem(user.uid, pid, problems[pid])
    } else {
      setError(err)
    }
  }

  const handleReset = () => {
    const { pid, err } = getPidfromIput(value)
    if (pid) {
      dispatch(resetSingleProblem(pid))
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

  const Content = () => {
    return (
      <>
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
      </>
    )
  }

  return (
    <CardTemplate
      title='Problem Review Setting'
      content={<Content />}
      rightButtonLabel='Add'
      rightButtonClickHandle={handleAdd}
      leftButtonLabel='Reset'
      leftButtonClickHandle={handleReset}
    />
  )
}
