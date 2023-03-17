import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import { Link } from "react-router-dom"

export interface ProfileButtonProp {
  label: string,
  linkToHome?: boolean,
  handleClick: () => void
}

export const ProfileButton = ({ label, linkToHome = false, handleClick }: ProfileButtonProp) => {
  return (
    <MenuItem key={label} onClick={handleClick}>
      <Typography textAlign="center">
        <Link
          to={`/${linkToHome ? '' : label}`}
          style={{ color: 'inherit', textDecoration: 'none' }}>
          {label}
        </Link>
      </Typography>
    </MenuItem>
  )
}
