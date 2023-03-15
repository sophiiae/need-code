import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = () => {
    console.log('signed up')
  }

  const handleLogin = () => {
    console.log(email, password)
  }

  return (
    <Box
      component='form'
      sx={{
        'marginTop': '50px',
        '& .MuiTextField-root': { m: 1, width: '300px' },
      }}
    >
      <div>
        <TextField
          required
          id='email'
          label='Email'
          variant='outlined'
          type='email'
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <TextField
          required
          id='password'
          label='Password'
          variant='outlined'
          type='password'
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div
        style={{
          width: '300px',
          margin: '30px',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Button
          variant='outlined'
          onClick={handleSignup}
        >Sign Up</Button>
        <Button
          variant='outlined'
          color='inherit'
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    </Box>
  )
}