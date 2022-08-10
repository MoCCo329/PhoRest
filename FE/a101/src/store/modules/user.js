import { createSlice } from '@reduxjs/toolkit'


export let token = createSlice({
  name: 'token',
  initialState: '',
  reducers: {
    setToken (state, action) {
      return action.payload
    }
  }
})
export let { setToken } = token.actions

export let currentUser = createSlice({
  name: 'currentUser',
  initialState: {
    username: '',
    nickname: '',
    phone: '',
    profileUrl: '',
    introduce: '',
  },
  reducers: {
    setCurrentUser (state, action) {
      return action.payload
    }
  }
})
export let { setCurrentUser } = currentUser.actions

export let authError = createSlice({
  name: 'authError',
  initialState: '',
  reducers: {
    setAuthError (state, action) {
      return action.payload
    }
  }
})
export let { setAuthError } = authError.actions