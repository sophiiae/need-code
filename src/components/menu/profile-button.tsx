import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { redirect, useAppDispatch } from '../../redux'
import { Link } from "react-router-dom"

export interface ProfileButtonProp {
  label: string,
  extraAction?: () => void
}

export const ProfileButton = ({ label, extraAction }: ProfileButtonProp) => {
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(redirect(label))
    extraAction?.()
  }

  return (
    <MenuItem key={label} onClick={handleClick}>
      <Typography textAlign="center">
        <Link
          to={`/${label}`}
          style={{ color: 'inherit', textDecoration: 'none' }}>
          {label}
        </Link>
      </Typography>
    </MenuItem>
  )
}
