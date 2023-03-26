import { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { AuthContext } from '../context/authContext'
import { Navigate } from "react-router-dom"
import { writeData } from '../firebase/useDatabase'
import { problems } from '../assets/problems'
import { addUsername } from '../redux/features/userSlice'

export const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const { state, dispatch } = useContext(AuthContext)

  if (state.isUserActive) {
    return <Navigate to='/' replace />
  }

  const handleCancel = () => {
    setIsSignup(false)
  }

  const handleSignUp = () => {
    setIsSignup(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        dispatch({ type: 'SIGNUP', payload: userCredential.user })
        writeData(userCredential.user.uid, {
          problems,
          review: {},
          settings: { username }
        })
        dispatch(addUsername(username))
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
      {isSignup ?
        <div>
          <TextField
            required
            id='username'
            label='Username'
            variant='outlined'
            type='text'
            onChange={e => setUsername(e.target.value)}
          />
        </div> : null
      }
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
          marginTop: '40px',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        {
          isSignup &&
          <Button
            color='error'
            variant='outlined'
            onClick={handleCancel}
          >Cancel</Button>
        }
        <Button
          variant='outlined'
          onClick={handleSignUp}
        >Sign Up</Button>
        {
          !isSignup &&
          <Button
            variant='outlined'
            color='inherit'
            onClick={handleLogin}
          >
            Log In
          </Button>
        }
      </div>
    </Box>
  )
}
