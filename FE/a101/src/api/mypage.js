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
}

export default mypage