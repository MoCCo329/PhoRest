// 마이페이지와 postID연결, 사진 다운로드, 동영상 다운로드, AR등을 위한 API

import api from './api'

const s3 = {
  detailPost (postId) {
    return api({
      method: 'get',
      url: `download/${btoa(postId * 73 - 37)}/`,
    })
  },
  profileURL (data) {
    return api({
      method: 'post',
      url: `upload/profileimage/`,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })
  }
}

export default s3