import { useContext, useState, KeyboardEvent } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { AuthContext } from '../context/authContext'
import { Navigate } from "react-router-dom"
import { getData, writeData } from '../firebase/useDatabase'
import { addUsername } from '../redux/features/userSlice'
import { ErrorText } from './index'
import { KeyCode } from '../store/enum'
import packageJson from '../../package.json'

export const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [error, setError] = useState('')
  const { state, dispatch } = useContext(AuthContext)
  const id = process.env.REACT_APP_TEST_USER

  if (state.isUserActive) {
    return <Navigate to='/' replace />
  }

  const handleCancel = () => {
    setIsSignup(false)
  }

  const handleSignUp = async () => {
    if (isSignup && !username) {
      setError('Error: invalid username. Username must only contains letters, numbers, - or _')
      return
    }
    if (isSignup && id) {
      const data = await getData(id)
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          dispatch({ type: 'SIGNUP', payload: userCredential.user })
          writeData(userCredential.user.uid, {
            problems: data.problems,
            review: {},
            settings: { username, version: packageJson.version }
          })
          dispatch(addUsername(username))
        })
        .catch((err) => {
          setError(err.message)
          console.error(`${err.code}: ${err.message}`)
        })
    }
    setIsSignup(true)
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
      .catch((err) => {
        setError(err.message)
        console.error(`${err.code}: ${err.message}`)
      })
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === KeyCode.ENTER) {
      isSignup ? handleSignUp() : handleLogin()
    }
  }

  return (
    <Box
      component='form'
      sx={{
        'marginTop': '50px',
        '& .MuiTextField-root': { m: 1, width: '300px' },
        minHeight: 'calc(100vh - 180px)',
      }}
    >
      {isSignup ?
        <TextField
          required
          id='username'
          label='Username'
          variant='outlined'
          type='text'
          fullWidth
          sx={{ display: 'block' }}
          onChange={e => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        /> : null
      }
      <TextField
        required
        id='email'
        label='Email'
        variant='outlined'
        type='email'
        fullWidth
        sx={{ display: 'block' }}
        onChange={e => setEmail(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <TextField
        required
        id='password'
        label='Password'
        variant='outlined'
        type='password'
        fullWidth
        sx={{ display: 'block' }}
        onChange={e => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <ErrorText message={error} />
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
