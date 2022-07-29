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

// 댓글 더미 => API로 받아서 저장하도록 바꿀 예정
let comments = createSlice({
  name: 'comments',
  initialState: [
    {username: 'test1', content: 'testestesttes', commentId: 1, date: '서울시 여러분'},
    {username: 'test2', content: 'testestesttes', commentId: 2, date: '서울시 여러분'},
    {username: 'test3', content: 'testestesttes', commentId: 3, date: '서울시 여러분'},
    {username: 'test4', content: 'testestesttes', commentId: 4, date: '서울시 여러분'},
    {username: 'test5', content: 'testestesttes', commentId: 5, date: '서울시 여러분'},
  ],
  reducers: {
    editComment (state, actions) {
      const {comment, idx} = actions.payload
      state[idx] = comment
    },
    deleteComment (state, idx) {
      state.splice(idx.payload, 1)
    },
    addComment (state, comment) {
      return state.concat(comment.payload)
    }
  }
})
export let { editComment, deleteComment, addComment } = comments.actions

let editCommentId = createSlice({
  name: 'editCommentId',
  initialState: 0,
  reducers: {
    setEditCommentId (state, value) {
      return value.payload
    }
  }
})
export let { setEditCommentId } = editCommentId.actions

export default configureStore({
    reducer: {
      content: content.reducer,
      comments: comments.reducer,
      editCommentId: editCommentId.reducer,
    }
  })