import { configureStore } from '@reduxjs/toolkit'
import { photoLike, photoRecent, frameLike, frameRecent, detailPost, detailComments, likeRecent, frameCnt, photoCnt, humanCount } from './modules/community.js'
import { token, currentUser, authError } from './modules/user.js'
import { userDetail, viewType, postForKakao } from './modules/mypage.js'

export default configureStore({
  reducer: {
    // community
    photoLike: photoLike.reducer,
    photoRecent: photoRecent.reducer,
    photoCnt: photoCnt.reducer,
    humanCount: humanCount.reducer,

    frameLike: frameLike.reducer,
    frameRecent: frameRecent.reducer,
    frameCnt: frameCnt.reducer,
    
    detailPost: detailPost.reducer,
    detailComments: detailComments.reducer,

    likeRecent: likeRecent.reducer,

    // member
    token: token.reducer,
    currentUser: currentUser.reducer,
    authError: authError.reducer,

    // mypage
    userDetail: userDetail.reducer,
    viewType: viewType.reducer,
    postForKakao: postForKakao.reducer,
  }
})