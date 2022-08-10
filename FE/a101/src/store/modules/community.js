import { createSlice } from '@reduxjs/toolkit'

export let photoLike = createSlice({
  name: 'photoLike',
  initialState: [],
  reducers: {
    setPhotoLike (state, action) {
      return action.payload
    },
    addPhotoLike (state, action) {
      return [...new Set([...state, ...action.payload])]
    },
    likePhotoLike (state, action) {
      const newPost = action.payload
      const copy = state.map((post, idx) => {
        if (post.id===newPost.id) {
          return newPost
        }
        return post
      })
      return copy
    },
    bookmarkPhotoLike (state, action) {
      const newPost = action.payload
      const copy = state.map((post, idx) => {
        if (post.id===newPost.id) {
          return newPost
        }
        return post
      })
      return copy
    }
  }
})
export let { setPhotoLike, addPhotoLike, likePhotoLike, bookmarkPhotoLike } = photoLike.actions

export let photoRecent = createSlice({
  name: 'photoRecent',
  initialState: [],
  reducers: {
    setPhotoRecent (state, action) {
      return action.payload
    },
    addPhotoRecent (state, action) {
      return [...state, ...action.payload]
    },
    likePhotoRecent (state, action) {
      const newPost = action.payload
      const copy = state.map((post, idx) => {
        if (post.id===newPost.id) {
          return newPost
        }
        return post
      })
      return copy
    },
    bookmarkPhotoRecent (state, action) {
      const newPost = action.payload
      const copy = state.map((post, idx) => {
        if (post.id===newPost.id) {
          return newPost
        }
        return post
      })
      return copy
    }
  }
})
export let { setPhotoRecent, addPhotoRecent, likePhotoRecent, bookmarkPhotoRecent } = photoRecent.actions

export let frameLike = createSlice({
  name: 'frameLike',
  initialState: [],
  reducers: {
    setFrameLike (state, action) {
      return action.payload
    },
    addFrameLike (state, action) {
      return [...state, ...action.payload]
    },
    likeFrameLike (state, action) {
      const newPost = action.payload
      const copy = state.map((post, idx) => {
        if (post.id===newPost.id) {
          return newPost
        }
        return post
      })
      return copy
    },
    bookmarkFrameLike (state, action) {
      const newPost = action.payload
      const copy = state.map((post, idx) => {
        if (post.id===newPost.id) {
          return newPost
        }
        return post
      })
      return copy
    }
  }
})
export let { setFrameLike, addFrameLike, likeFrameLike, bookmarkFrameLike } = frameLike.actions

export let frameRecent = createSlice({
  name: 'frameRecent',
  initialState: [],
  reducers: {
    setFrameRecent (state, action) {
      return action.payload
    },
    addFrameRecent (state, action) {
      return [...state, ...action.payload]
    },
    likeFrameRecent (state, action) {
      const newPost = action.payload
      const copy = state.map((post, idx) => {
        if (post.id===newPost.id) {
          return newPost
        }
        return post
      })
      return copy
    },
    bookmarkFrameRecent (state, action) {
      const newPost = action.payload
      const copy = state.map((post, idx) => {
        if (post.id===newPost.id) {
          return newPost
        }
        return post
      })
      return copy
    }
  }
})
export let { setFrameRecent, addFrameRecent, likeFrameRecent, bookmarkFrameRecent } = frameRecent.actions

export let detailPost = createSlice({
  name: 'detailPost',
  initialState: '',
  reducers: {
    setDetailPost (state, action) {
      return action.payload
    }
  }
})
export let { setDetailPost, likeDetailPost, bookmarkDetailPost } = detailPost.actions

export let detailComments = createSlice({
  name: 'detailComments',
  initialState: [],
  reducers: {
    setDetailComment (state, action) {
      return action.payload
    },
    editComment (state, action) {
      const {comment, idx} = action.payload
      state[idx] = comment
    },
    deleteComment (state, id) {
      const copy = state.map((comment) => {
        if (comment.id!==id) return comment
      })
      return copy
    },
    addComment (state, comment) {
      return state.concat(comment.payload)
    }
  }
})
export let { setDetailComment } = detailComments.actions

export let likeRecent = createSlice({
  name: 'likeRecent',
  initialState: true,
  reducers: {
    setLikeRecent (state, action) {
      return action.payload
    }
  }
})
export let { setLikeRecent } = likeRecent.actions