import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

const initialState = {
  linkTo: 'Home'
}

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    redirect: (state: any, action: PayloadAction<string>) => ({
      linkTo: action.payload
    })
  }
})

export const { redirect } = contentSlice.actions

export const selectContent = (state: RootState) => state.content

export default contentSlice.reducer

