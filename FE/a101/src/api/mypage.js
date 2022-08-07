import api from './api'

const mypage = {
  sharePost (postId) {
    return api({
      method: 'post',
      url: `mypage/${btoa(postId * 73 - 37)}/share/`,
    })
  },
}

export default mypage