import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthUser: !!localStorage.getItem('user'),
  user: JSON.parse(localStorage.getItem('user')) || {},
}

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setUser: (state, action) => ({
      ...state,
      isAuthUser: true,
      user: action.payload,
    }),
    logout: (state) => ({ ...state, isAuthUser: false, user: {} }),
  },
})

export const { setUser, logout } = authenticationSlice.actions

export default authenticationSlice.reducer
