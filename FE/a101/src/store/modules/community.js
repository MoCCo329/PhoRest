import { createSlice } from '@reduxjs/toolkit'

import p1 from './../../assets/1.png'
import p2 from './../../assets/2.png'
import p3 from './../../assets/3.png'
import p4 from './../../assets/4.png'
import p5 from './../../assets/5.png'


export let picPopular = createSlice({
  name: 'picPopular',
  initialState: [
    {
      category: 'pic',
      date: '서울시 여러분',
      frameId: 1,
      postId: 1,
      content: 'pic has no content',
      url: p1,
      peopleNum: 1
    },
    {
      category: 'pic',
      date: '서울시 여러분',
      frameId: 2,
      postId: 2,
      content: 'pic has no content',
      url: p2,
      peopleNum: 1
    },
    {
      category: 'pic',
      date: '서울시 여러분',
      frameId: 3,
      postId: 3,
      content: 'pic has no content',
      url: p3,
      peopleNum: 1
    },
    {
      category: 'pic',
      date: '서울시 여러분',
      frameId: 4,
      postId: 4,
      content: 'pic has no content',
      url: p4,
      peopleNum: 2
    },
    {
      category: 'pic',
      date: '서울시 여러분',
      frameId: 5,
      postId: 5,
      content: 'pic has no content',
      url: p5,
      peopleNum: 2
    },
  ],
  reducers: {
    fetchPicPopular (state, actions) {
      // api로 받아와서 넣기
    }
  }
})
export let { fetchPicPopular } = picPopular.actions

export let picRecent = createSlice({
  name: 'picRecent',
  initialState: [],
  reducers: {

  }
})
// export let {  } = picRecent.actions

export let framePopular = createSlice({
  name: 'framePopular',
  initialState: [
    {
      category: 'frame',
      date: '서울시 여러분',
      frameId: 1,
      postId: 1,
      content: 'content of 1',
      url: p1,
      peopleNum: 1
    },
    {
      category: 'frame',
      date: '서울시 여러분',
      frameId: 2,
      postId: 2,
      content: 'content of 2',
      url: p2,
      peopleNum: 1
    },
    {
      category: 'frame',
      date: '서울시 여러분',
      frameId: 3,
      postId: 3,
      content: 'content of 3',
      url: p3,
      peopleNum: 1
    },
    {
      category: 'frame',
      date: '서울시 여러분',
      frameId: 1,
      postId: 1,
      content: 'content of 1',
      url: p1,
      peopleNum: 1
    },
    {
      category: 'frame',
      date: '서울시 여러분',
      frameId: 3,
      postId: 3,
      content: 'content of 3',
      url: p3,
      peopleNum: 1
    },
    {
      category: 'frame',
      date: '서울시 여러분',
      frameId: 4,
      postId: 4,
      content: 'content of 4',
      url: p4,
      peopleNum: 2
    },
    {
      category: 'frame',
      date: '서울시 여러분',
      frameId: 5,
      postId: 5,
      content: 'content of 5',
      url: p5,
      peopleNum: 2
    },
    {
      category: 'frame',
      date: '서울시 여러분',
      frameId: 3,
      postId: 3,
      content: 'content of 3',
      url: p3,
      peopleNum: 2
    },
    {
      category: 'frame',
      date: '서울시 여러분',
      frameId: 4,
      postId: 4,
      content: 'content of 4',
      url: p4,
      peopleNum: 2
    },
    {
      category: 'frame',
      date: '서울시 여러분',
      frameId: 5,
      postId: 5,
      content: 'content of 5',
      url: p5,
      peopleNum: 2
    },
  ],
  reducers: {
  }
})
// export let {  } = framePopular.actions

export let frameRecent = createSlice({
  name: 'frameRecent',
  initialState: [],
  reducers: {
    
  }
})
// export let {  } = frameRecent.actions

export let pic = createSlice({
  name: 'pic',
  initialState: {
    category: 'frame',
    date: '서울시 여러분',
    frameId: 1,
    postId: 1,
    content: 'content of 1',
    url: p1,
    peopleNum: 1
  },
  reducers: {
    // api로 불러오기
  }
})
// export let {  } = pic.actions


export let comments = createSlice({
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

export let editCommentId = createSlice({
  name: 'editCommentId',
  initialState: 0,
  reducers: {
    setEditCommentId (state, value) {
      return value.payload
    }
  }
})
export let { setEditCommentId } = editCommentId.actions