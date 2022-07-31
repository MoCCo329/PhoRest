import { createSlice } from '@reduxjs/toolkit'

import p12 from './../../assets/1/12.jpg'
import p14 from './../../assets/1/14.jpg'
import p16 from './../../assets/1/16.jpg'
import p18 from './../../assets/1/18.jpg'
import p20 from './../../assets/1/20.jpg'
import p22 from './../../assets/2/22.png'
import p24 from './../../assets/2/24.png'
import p26 from './../../assets/2/26.png'
import p28 from './../../assets/2/28.png'
import p30 from './../../assets/3/30.png'
import p32 from './../../assets/3/32.png'
import p34 from './../../assets/3/34.png'
import p36 from './../../assets/3/36.png'

import f2 from './../../assets/frame/2.jpg'
import f4 from './../../assets/frame/4.jpg'
import f6 from './../../assets/frame/6.jpg'
import f8 from './../../assets/frame/8.png'
import f10 from './../../assets/frame/10.png'


export let picPopular = createSlice({
  name: 'picPopular',
  initialState: [
    {
      postId: 12,
      category: 'photogroup',
      url: p12,
      content: '',
      humanCount: 1,
      time: '2022-07-31T12:29:02.227009',
    },
    {
      postId: 14,
      category: 'photogroup',
      url: p14,
      content: '',
      humanCount: 1,
      time: '2022-07-31T12:29:06.878601',
    },
    {
      postId: 16,
      category: 'photogroup',
      url: p16,
      content: '',
      humanCount: 1,
      time: '2022-07-31T12:29:11.079983',
    },
    {
      postId: 18,
      category: 'photogroup',
      url: p18,
      content: '',
      humanCount: 1,
      time: '2022-07-31T12:29:16.603088',
    },
    {
      postId: 20,
      category: 'photogroup',
      url: p20,
      content: '',
      humanCount: 1,
      time: '2022-07-31T12:29:26.204346',
    },
    {
      postId: 22,
      category: 'photogroup',
      url: p22,
      content: '',
      humanCount: 2,
      time: '2022-07-31T12:30:02.244543',
    },
    {
      postId: 24,
      category: 'photogroup',
      url: p24,
      content: '',
      humanCount: 2,
      time: '2022-07-31T12:30:05.59279',
    },
    {
      postId: 26,
      category: 'photogroup',
      url: p26,
      content: '',
      humanCount: 2,
      time: '2022-07-31T12:30:08.559857',
    },
    {
      postId: 28,
      category: 'photogroup',
      url: p28,
      content: '',
      humanCount: 2,
      time: '2022-07-31T12:30:13.358787',
    },
    {
      postId: 30,
      category: 'photogroup',
      url: p30,
      content: '',
      humanCount: 3,
      time: '2022-07-31T12:30:55.511447',
    },
    {
      postId: 32,
      category: 'photogroup',
      url: p32,
      content: '',
      humanCount: 3,
      time: '2022-07-31T12:31:00.460327',
    },
    {
      postId: 34,
      category: 'photogroup',
      url: p34,
      content: '',
      humanCount: 3,
      time: '2022-07-31T12:31:04.068346',
    },
    {
      postId: 36,
      category: 'photogroup',
      url: p36,
      content: '',
      humanCount: 3,
      time: '2022-07-31T12:31:07.770683',
    },
    {
      postId: 38,
      category: 'photogroup',
      url: p36,
      content: '',
      humanCount: 4,
      time: '2022-07-31T12:31:59.27684',
    },
    {
      postId: 40,
      category: 'photogroup',
      url: p36,
      content: '',
      humanCount: 4,
      time: '2022-07-31T12:32:04.138827',
    },
    {
      postId: 42,
      category: 'photogroup',
      url: p36,
      content: '',
      humanCount: 4,
      time: '2022-07-31T12:32:07.267156',
    },
    {
      postId: 44,
      category: 'photogroup',
      url: p36,
      content: '',
      humanCount: 4,
      time: '2022-07-31T12:31:07.770683',
    },
    {
      postId: 46,
      category: 'photogroup',
      url: p36,
      content: '',
      humanCount: 5,
      time: '2022-07-31T12:31:07.770683',
    },
    {
      postId: 48,
      category: 'photogroup',
      url: p36,
      content: '',
      humanCount: 5,
      time: '2022-07-31T12:31:07.770683',
    },
    {
      postId: 50,
      category: 'photogroup',
      url: p36,
      content: '',
      humanCount: 5,
      time: '2022-07-31T12:31:07.770683',
    },
    {
      postId: 52,
      category: 'photogroup',
      url: p36,
      content: '',
      humanCount: 5,
      time: '2022-07-31T12:31:07.770683',
    },
    {
      postId: 54,
      category: 'photogroup',
      url: p36,
      content: '',
      humanCount: 6,
      time: '2022-07-31T12:31:07.770683',
    },
    {
      postId: 56,
      category: 'photogroup',
      url: p36,
      content: '',
      humanCount: 6,
      time: '2022-07-31T12:31:07.770683',
    },
    {
      postId: 58,
      category: 'photogroup',
      url: p36,
      content: '',
      humanCount: 6,
      time: '2022-07-31T12:31:07.770683',
    },
    {
      postId: 60,
      category: 'photogroup',
      url: p36,
      content: '',
      humanCount: 6,
      time: '2022-07-31T12:31:07.770683',
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
      postId: 2,
      category: 'frame',
      url: f2,
      content: '감각있는 땡땡이 무늬',
      humanCount: NaN,
      time: '2022-07-31T12:24:59.696299',
    },
    {
      postId: 4,
      category: 'frame',
      url: f4,
      content: '알록달록 알',
      humanCount: NaN,
      time: '2022-07-31T12:25:23.620317',
    },
    {
      postId: 6,
      category: 'frame',
      url: f6,
      content: '파란하늘에 핀 붉은 꽃',
      humanCount: NaN,
      time: '2022-07-31T12:26:03.642121',
    },
    {
      postId: 8,
      category: 'frame',
      url: f8,
      content: '파란 배경에 이파리',
      humanCount: NaN,
      time: '2022-07-31T12:27:23.413719',
    },
    {
      postId: 10,
      category: 'frame',
      url: f10,
      content: '아기자기한 소품들',
      humanCount: NaN,
      time: '2022-07-31T12:27:42.704231',
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
    postId: NaN,
    category: '',
    url: '',
    content: '',
    humanCount: NaN,
    time: '',
  },
  reducers: {
    fetchPic (state, action) {
      return action.payload
    }
  }
})
export let { fetchPic } = pic.actions

export let comments = createSlice({
  name: 'comments',
  initialState: [
    {username: '파란곰돌이', content: '멋져요', commentId: 1, date: '서울시 여러분'},
    {username: '노랑비둘기', content: '예뻐요', commentId: 2, date: '서울시 여러분'},
    {username: '회색갈매기', content: '😍😍😍', commentId: 3, date: '서울시 여러분'},
    {username: '초록물고기', content: '대단해요', commentId: 4, date: '서울시 여러분'},
    {username: '하얀달팽이', content: '👏👏👏', commentId: 5, date: '서울시 여러분'},
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