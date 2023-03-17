import { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth'
import { AuthContext } from '../context/authContext'
import { Navigate } from "react-router-dom"

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { state, dispatch } = useContext(AuthContext)

  if (state.isUserActive) {
    return <Navigate to='/' replace />
  }

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        dispatch({ type: 'SIGNUP', payload: userCredential.user })
      })
      .catch((error) => {
        console.error(`${error.code}: ${error.message}`)
      })
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        dispatch({
          type: 'SIGNIN',
          payload: userCredential.user
        })
      })
      .catch((error) => {
        console.error(`${error.code}: ${error.message}`)
      })
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
          onClick={handleSignUp}
        >Sign Up</Button>

        <Button
          variant='outlined'
          color='inherit'
          onClick={handleLogin}
        >
          Log In
        </Button>
      </div>
    </Box>
  )
}