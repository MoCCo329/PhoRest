<<<<<<< HEAD
import api from './api'

const mypage = {
  sharePost (postId) {
    return api({
      method: 'post',
      url: `mypage/${btoa(postId * 73 - 37)}/share/`,
    })
  },
=======
// 내 정보, 기록들을 불러오기 위한 API

import api from './api'

const END_POINT = 'mypage'


const mypage = {
  userDetail (username) {
    return api({
      method: 'get',
      url: `${END_POINT}/${username}/`,
    })
  }
>>>>>>> feature/fe/mypage
}

export default mypage