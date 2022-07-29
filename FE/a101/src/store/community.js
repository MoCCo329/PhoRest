import { configureStore, createSlice } from '@reduxjs/toolkit'


let content = createSlice({
  name: 'content',
  initialState: '',
  reducers: {
    setContent (state, value) {
      return value
    }
  }
})
export let setContent = content.actions


export default configureStore({
    reducer: {
      content: content.reducer,
    }
  })