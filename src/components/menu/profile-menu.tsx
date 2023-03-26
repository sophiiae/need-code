import { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Button from '@mui/material/Button'
import { Link } from "react-router-dom"
import { signOut } from 'firebase/auth'

import { ProfileButton } from '../index'
import { AuthContext } from '../../context/authContext'
import { auth } from '../../firebase/config'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { useAppSelector } from '../../redux/hooks'

export const ProfileMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const { state, dispatch } = useContext(AuthContext)
  const user = useAppSelector(state => state.user)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleClick = () => {
    setAnchorElUser(null)
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: 'SIGNOUT' })
      })
    setAnchorElUser(null)
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      {state.isUserActive ?
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenUserMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton> :
        <Button key='login' sx={{ color: '#fff' }}>
          <Link
            to={`/login`}
            style={{ color: 'inherit', textDecoration: 'none' }}>
            Login
          </Link>
        </Button>
      }
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {
          !!user.username ?
            <MenuItem key='user-name' onClick={handleClick}>
              <Typography textAlign="center">
                {user.username}
              </Typography>
            </MenuItem> : null
        }
        <ProfileButton label='Profile' handleClick={handleClick} />
        <ProfileButton label='Account' handleClick={handleClick} />
        <ProfileButton label='Logout' linkToHome={true} handleClick={handleLogout} />
      </Menu>
    </Box>
  )
}