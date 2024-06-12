import { createSlice } from '@reduxjs/toolkit'

let initialState = {}

const templateNameSlice = createSlice({
  name: 'templateName',
  initialState,
  reducers: {
    sampleFun: (state, action) => ({ ...state }),
  },
})

export const { sampleFun } = templateNameSlice.actions
export default templateNameSlice.reducer
