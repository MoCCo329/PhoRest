import { configureStore } from '@reduxjs/toolkit'
import { picPopular, picRecent, framePopular, frameRecent, pic, editCommentId, comments } from './modules/community.js'
import { pics_mypage } from './modules/mypage.js'


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
    pics_mypage: pics_mypage.reducer,
  }
})