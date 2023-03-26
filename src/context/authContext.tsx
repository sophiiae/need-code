import { createContext, useReducer, Dispatch } from 'react'
import { authReducer } from './reducers'
import { UserProfileModel } from '../store/interfaces'

// Define the initial state using that type
const initialState: UserProfileModel = {
  user: null,
  isUserActive: false,
  settings: { username: '' }
}

export const AuthContext = createContext<{ state: UserProfileModel, dispatch: Dispatch<any> }>({
  state: initialState,
  dispatch: () => null
})

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
