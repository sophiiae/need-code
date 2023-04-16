import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

export const Footer = () => {
  return (
    <Box sx={{
      position: 'relative',
      bottom: 10,
      width: '100%',
      height: '1em',
      display: 'flex',
      justifyContent: 'space-around'
    }}>
      <Typography sx={{ fontSize: 12 }}>
        Copyright © 2023 NeedCode
      </Typography>
    </Box>
  )
}
