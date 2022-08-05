import { configureStore } from '@reduxjs/toolkit'
import { photoLike, photoRecent, frameLike, frameRecent, detailPost, detailComments, editCommentId } from './modules/community.js'
import { token, currentUser, authError } from './modules/user.js'

export default configureStore({
  reducer: {
    // community
    photoLike: photoLike.reducer,
    photoRecent: photoRecent.reducer,
    frameLike: frameLike.reducer,
    frameRecent: frameRecent.reducer,
    detailPost: detailPost.reducer,
    detailComments: detailComments.reducer,
    editCommentId: editCommentId.reducer,

    // member
    token: token.reducer,
    currentUser: currentUser.reducer,
    authError: authError.reducer,
  }
})