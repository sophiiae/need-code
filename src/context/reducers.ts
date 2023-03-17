import type { PayloadAction } from '@reduxjs/toolkit'

export const authReducer = (state: any, action: PayloadAction<any>) => {
  switch (action.type) {
    case 'SIGNUP':
    case 'SIGNIN':
      return { user: action.payload, isUserActive: true }
    case 'SIGNOUT':
      return { user: null, isUserActive: false }
    case 'TEST':
      return { ...state, isUserActive: !state.isUserActive }
    default:
      return state
  }
}
