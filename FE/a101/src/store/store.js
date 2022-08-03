import { configureStore } from '@reduxjs/toolkit'
import { picPopular, picRecent, framePopular, frameRecent, pic, editCommentId, comments } from './modules/community.js'
import { token, currentUser, authError } from './modules/member.js'

export default configureStore({
  reducer: {
    // community
    picPopular: picPopular.reducer,
    picRecent: picRecent.reducer,
    framePopular: framePopular.reducer,
    frmaeRecent: frameRecent.reducer,
    pic: pic.reducer,
    comments: comments.reducer,
    editCommentId: editCommentId.reducer,

    // member
    token: token.reducer,
    currentUser: currentUser.reducer,
    authError: authError.reducer,
  }
})