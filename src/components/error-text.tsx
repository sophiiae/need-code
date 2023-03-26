import Typography from '@mui/material/Typography'

interface ErrorProp {
  message: string
}

export const ErrorText = ({ message }: ErrorProp) => {
  return (
    <Typography
      sx={{ ml: 1, mt: 1, color: '#e63946', fontSize: 12 }}>
      {message}
    </Typography>
  )
}
