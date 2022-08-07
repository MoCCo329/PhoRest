import { configureStore } from '@reduxjs/toolkit'
<<<<<<< HEAD
import { photoLike, photoRecent, frameLike, frameRecent, detailPost, detailComments, editCommentId } from './modules/community.js'
import { token, currentUser, authError } from './modules/user.js'
=======
import { picPopular, picRecent, framePopular, frameRecent, pic, editCommentId, comments } from './modules/community.js'
import { userDetail } from './modules/mypage.js'

>>>>>>> feature/fe/mypage

export default configureStore({
  reducer: {
    // community
<<<<<<< HEAD
    photoLike: photoLike.reducer,
    photoRecent: photoRecent.reducer,
    frameLike: frameLike.reducer,
    frameRecent: frameRecent.reducer,
    
    detailPost: detailPost.reducer,
    detailComments: detailComments.reducer,

    // member
    token: token.reducer,
    currentUser: currentUser.reducer,
    authError: authError.reducer,
=======
    picPopular: picPopular.reducer,
    picRecent: picRecent.reducer,
    framePopular: framePopular.reducer,
    frmaeRecent: frameRecent.reducer,
    pic: pic.reducer,
    comments: comments.reducer,
    editCommentId: editCommentId.reducer,

    // mypage
    userDetail: userDetail.reducer,
>>>>>>> feature/fe/mypage
  }
})