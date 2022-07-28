import { configureStore, createSlice } from '@reduxjs/toolkit'


let token = createSlice({
  name: 'token',
  initialState: '',
  reducers: {
    setToken (state, value) {
      return value
    }
  }
})
export let setToken = token.actions

let currentUser = createSlice({
  name: 'currentUser',
  initialState: '',
  reducers: {
    setCurrentUser (state, value) {
      return value
    }
  }
})
export let setCurrentUser = currentUser.actions

let authError = createSlice({
  name: 'authError',
  initialState: '',
  reducers: {
    setAuthError (state, value) {
      return value
    }
  }
})
export let setAuthError = authError.actions

export default configureStore({
  reducer: {
    token: token.reducer,
    currentUser: currentUser.reducer,
    authError: authError.reducer,
  }
})