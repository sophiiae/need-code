import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

export const NotFound = () => {
  return (
    <Box sx={{ minHeight: 'calc(100vh - 130px)' }}>
      <Typography sx={{ fontSize: 26 }}>
        <span style={{ color: '#e63946', fontWeight: '800', fontSize: '68px' }}>404</span>
        <p>Oops! Page Not Found.</p>
      </Typography>
    </Box>
  )
}
