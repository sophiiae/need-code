import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ProblemsObject, ReviewObject, TableFiltersModel } from '../../store/interfaces'
import { getFormattedDate } from '../../store/tools'

interface TableState {
  problems: ProblemsObject,
  review: ReviewObject,
  filters?: TableFiltersModel
}

const initialState: TableState = {
  problems: {},
  review: {},
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    updateSingleProblem: (state, action: PayloadAction<keyof ProblemsObject>) => {
      const id = action.payload
      const data = state.problems[id]
      data.solved += 1
      data.lastSubmit = getFormattedDate()

      // update review pool
      if (state.review[id]) {
        state.review[id] += 1
      } else {
        state.review[id] = 1
      }
      return state
    },
    resetSingleProblem: (state, action: PayloadAction<keyof ProblemsObject>) => {
      const id = action.payload
      const data = state.problems[id]
      data.solved = 0
      data.lastSubmit = '1/1/2001'
      delete state.review[id]
      return state
    },
    updateAllProblems: (state, action: PayloadAction<ProblemsObject>) => ({
      ...state,
      problems: action.payload
    }),
    updateAllReview: (state, action: PayloadAction<ReviewObject>) => ({
      ...state,
      review: action.payload
    }),
    setFilters: (state, action: PayloadAction<TableFiltersModel>) => ({
      ...state,
      filters: {
        ...state.filters,
        ...action.payload
      }
    }),
    clearFilters: (state) => ({
      problems: state.problems,
      review: state.review,
    })
  },
})

export const {
  updateAllProblems,
  updateAllReview,
  updateSingleProblem,
  resetSingleProblem,
  setFilters,
  clearFilters,
} = tableSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTable = (state: RootState) => state.table

export const tableReducer = tableSlice.reducer
