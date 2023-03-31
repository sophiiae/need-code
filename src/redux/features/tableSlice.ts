import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ProblemsObject, ReviewObject } from '../../store/interfaces'

interface TableState {
  problems: ProblemsObject,
  review: ReviewObject
}

const initialState: TableState = {
  problems: {},
  review: {},
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    updateProblems: (state, action: PayloadAction<ProblemsObject>) => ({
      ...state,
      problems: action.payload
    }),
    updateReview: (state, action: PayloadAction<ReviewObject>) => ({
      ...state,
      review: action.payload
    })
  },
})

export const { updateProblems, updateReview } = tableSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTable = (state: RootState) => state.table

export const tableReducer = tableSlice.reducer
