import { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { ProblemModel } from '../store/interfaces'
import { ProblemTable, LoadingCircle } from './index'
import { AuthContext } from '../context/authContext'
import { getData } from '../firebase/useDatabase'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn'

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

export interface MainContentWrapperProps {
  problems: ProblemModel[]
}

export const MainContentWrapper = () => {
  const [data, setData] = useState<ProblemModel[]>([])
  const { state } = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      const d = await getData(state.user.uid)
      setData(Object.values(d.problems))
    }
    if (!data.length) {
      fetchData()
    }
  }, [])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex' }}>
          <Box sx={{ width: '400px', display: 'inline-block' }}>
            <CustomTextField
              label="Add problems for review"
              id='add-problem-review'
              fullWidth />
          </Box>
          <Button
            variant="contained"
            color='inherit'
            sx={{ alignSelf: 'center', marginLeft: '20px' }}>
            Add
          </Button>
        </span>
        <Button
          variant="text"
          color='success'
          startIcon={<ShuffleOnIcon />}
          sx={{ alignSelf: 'center' }}>
          Pick One
        </Button>
      </div>
      {data.length
        ? <ProblemTable problems={data} />
        : <LoadingCircle />}
    </div>
  )
}
