import Box from '@mui/material/Box/Box'
import Button from '@mui/material/Button/Button'
import { ReactNode } from 'react'

export interface FormWrapperProps {
  formWidth: string,
  fitHeight: boolean,
  children: ReactNode,
  handleSubmit: () => void
}

export const FormWrapper = ({ formWidth, fitHeight,  children, handleSubmit }: FormWrapperProps) => {
  return (
    <Box
      component='form'
      sx={{
        'marginTop': '50px',
        '& .MuiTextField-root': { m: 1, width: formWidth },
        minHeight: fitHeight ? '' : 'calc(100vh - 180px)',
      }}
    >
      {children}
      <div
        style={{
          width: formWidth,
          marginTop: '40px',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
      <Button
        variant='outlined'
        color='inherit'
        sx={{ marginBottom: '20px' }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
      </div>
    </Box>
  )
}
