import { configureStore } from '@reduxjs/toolkit'

import userReucer from './features/userSlice'
import contentReducer from './features/contentSlice'

export const createStore = () =>
  configureStore({
    reducer: {
      user: userReucer,
      content: contentReducer
    },
    devTools: true
  })

export const store = createStore()

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
