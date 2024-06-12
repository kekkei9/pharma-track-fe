// src/redux/store.js
import { configureStore, Action } from '@reduxjs/toolkit'
// import { ThunkAction } from 'redux-thunk'
import authenticationReducer from './authentication/authentication.slice'

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
