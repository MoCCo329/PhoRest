// 마이페이지와 postID연결, 사진 다운로드, 동영상 다운로드, AR등을 위한 API

import api from './api'

const END_POINT = 'download'


const download = {
  pic (postId) {
    return api({
      method: 'get',
      url: `${END_POINT}/${postId}/`,
    })
  }
}

export default download