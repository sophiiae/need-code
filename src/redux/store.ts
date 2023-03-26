import { configureStore } from '@reduxjs/toolkit'
import { modalReducer } from './features/modalSlice'
import { userReducer } from './features/userSlice'

export const createStore = () => configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
  },
})

export const store = createStore()

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
