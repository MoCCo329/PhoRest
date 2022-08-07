import { createSlice } from '@reduxjs/toolkit'

export let photoLike = createSlice({
  name: 'photoLike',
  initialState: [],
  reducers: {
    setPhotoLike (state, actions) {
      return actions.payload
    },
    addPhotoLike (state, actions) {
      return [...new Set([...state, ...actions.payload])]
    },
    likePhotoLike (state, actions) {
      const {postId, isLike} = actions.payload
      state.forEach((post, idx) => {
        if (post.id===postId) {
          post.isLike = isLike
        }
      })
    },
    bookmarkPhotoLike (state, actions) {
      const {postId, isBookmark} = actions.payload
      state.forEach((post, idx) => {
        if (post.id===postId) {
          post.isBookmark = isBookmark
        }
      })
    }
  }
})
export let { setPhotoLike, addPhotoLike, likePhotoLike, bookmarkPhotoLike } = photoLike.actions

export let photoRecent = createSlice({
  name: 'photoRecent',
  initialState: [],
  reducers: {
    setPhotoRecent (state, actions) {
      return actions.payload
    },
    addPhotoRecent (state, actions) {
      return [...state, ...actions.payload]
    },
    likePhotoRecent (state, actions) {
      const {postId, isLike} = actions.payload
      state.forEach((post, idx) => {
        if (post.id===postId) {
          post.isLike = isLike
        }
      })
    },
    bookmarkPhotoRecent (state, actions) {
      const {postId, isBookmark} = actions.payload
      state.forEach((post, idx) => {
        if (post.id===postId) {
          post.isBookmark = isBookmark
        }
      })
    }
  }
})
export let { setPhotoRecent, addPhotoRecent, likePhotoRecent, bookmarkPhotoRecent } = photoRecent.actions

export let frameLike = createSlice({
  name: 'frameLike',
  initialState: [],
  reducers: {
    setFrameLike (state, actions) {
      return actions.payload
    },
    addFrameLike (state, actions) {
      return [...state, ...actions.payload]
    },
    likeFrameLike (state, actions) {
      const {postId, isLike} = actions.payload
      state.forEach((post, idx) => {
        if (post.id===postId) {
          post.isLike = isLike
        }
      })
    },
    bookmarkFrameLike (state, actions) {
      const {postId, isBookmark} = actions.payload
      state.forEach((post, idx) => {
        if (post.id===postId) {
          post.isBookmark = isBookmark
        }
      })
    }
  }
})
export let { setFrameLike, addFrameLike, likeFrameLike, bookmarkFrameLike } = frameLike.actions

export let frameRecent = createSlice({
  name: 'frameRecent',
  initialState: [],
  reducers: {
    setFrameRecent (state, actions) {
      return actions.payload
    },
    addFrameRecent (state, actions) {
      return [...state, ...actions.payload]
    },
    likeFrameRecent (state, actions) {
      const {postId, isLike} = actions.payload
      state.forEach((post, idx) => {
        if (post.id===postId) {
          post.isLike = isLike
        }
      })
    },
    bookmarkFrameRecent (state, actions) {
      const {postId, isBookmark} = actions.payload
      state.forEach((post, idx) => {
        if (post.id===postId) {
          post.isBookmark = isBookmark
        }
      })
    }
  }
})
export let { setFrameRecent, addFrameRecent, likeFrameRecent, bookmarkFrameRecent } = frameRecent.actions

export let detailPost = createSlice({
  name: 'detailPost',
  initialState: '',
  reducers: {
    setDetailPost (state, actions) {
      return actions.payload
    },
    likeDetailPost (state, actions) {
      const copy = state
      copy.isLike = actions.payload
      return copy
    },
    bookmarkDetailPost (state, actions) {
      const copy = state
      copy.isBookmark = actions.payload
      return copy
    }
  }
})
export let { setDetailPost, likeDetailPost, bookmarkDetailPost } = detailPost.actions

export let detailComments = createSlice({
  name: 'detailComments',
  initialState: [],
  reducers: {
    setDetailComment (state, actions) {
      return actions.payload
    },
    editComment (state, actions) {
      const {comment, idx} = actions.payload
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