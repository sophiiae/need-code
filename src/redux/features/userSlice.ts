import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  id: string,
  username: string,
}

const initialState: UserState = {
  id: '',
  username: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserId: (state, action: PayloadAction<string>) => ({
      ...state,
      id: action.payload
    }),
    addUsername: (state, action: PayloadAction<string>) => ({
      ...state,
      username: action.payload
    })
  },
})

export const { addUserId, addUsername } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user

export const userReducer = userSlice.reducer
