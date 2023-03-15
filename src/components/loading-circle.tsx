import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export const LoadingCircle = () => {
  return (
    <Box sx={{ display: 'flex', color: 'black' }}>
      <CircularProgress color='inherit' />
    </Box>
  )
}
