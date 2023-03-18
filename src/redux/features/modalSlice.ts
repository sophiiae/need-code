import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ProblemModel } from '../../store/interfaces'

interface ModalState {
  open: boolean,
  data: ProblemModel
}

const initialState: ModalState = {
  open: false,
  data: {
    id: 1,
    title: "Two Sum",
    url: "https://leetcode.com/problems/two-sum",
    difficulty: 1,
    paidOnly: 0,
    favor: 0,
    solved: 0,
    lastSubmit: "2000-01-16T00:00:00.000Z",
    visited: 0,
    noteUrl: ""
  }
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    closeModal: (state) => ({
      ...state,
      open: false
    }),
    openModal: (state, action: PayloadAction<ProblemModel>) => ({
      open: true,
      data: action.payload
    })
  },
})

export const { closeModal, openModal } = modalSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectModal = (state: RootState) => state.modal

export const modalReducer =  modalSlice.reducer
