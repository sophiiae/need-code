import { configureStore } from '@reduxjs/toolkit'
import { modalReducer } from './features/modalSlice'

export const createStore = () => configureStore({
  reducer: {
    modal: modalReducer
  },
})

export const store = createStore()

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
