import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { UserProfileModel, UserModel } from '../../store/interfaces'

// Define the initial state using that type
const initialState: UserProfileModel = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state: UserProfileModel, action: PayloadAction<UserModel>) => ({
      ...state,
      user: action.payload
    }),
    logout: (state: UserProfileModel) => ({
      ...state,
      user: null
    })
  }
})

export const { login, logout } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
