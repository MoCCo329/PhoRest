import api from './api'

const END_POINT = 'community'


const community = {
  detailPost (postId) {
    return api({
      method: 'get',
      url: `${END_POINT}/${btoa(postId * 73 + 37)}/`
    })
  },
  editPost (postId, data) {
    return api({
      method: 'put',
      url: `${END_POINT}/${btoa(postId * 73 + 37)}/`,
      data: data
    })
  },
  deletePost (postId) {
    return api({
      method: 'delete',
      url: `${END_POINT}/${btoa(postId * 73 + 37)}/`
    })
  },
  likePost (postId) {
    return api({
      method: 'post',
      url: `${END_POINT}/${btoa(postId * 73 + 37)}/like/`,
    })
  },
  bookmarkPost (postId) {
    return api({
      method: 'post',
      url: `${END_POINT}/${btoa(postId * 73 + 37)}/bookmark/`
    })
  },
  getComments (postId) {
    return api({
      method: 'get',
      url: `${END_POINT}/${btoa(postId * 73 + 37)}/comment/`
    })
  },
  createComment (postId, data) {
    return api({
      method: 'post',
      url: `${END_POINT}/${btoa(postId * 73 + 37)}/comment/`,
      data: data
    })
  },
  editComment (postId, commentId, data) {
    return api({
      method: 'put',
      url: `${END_POINT}/${btoa(postId * 73 + 37)}/comment/${commentId}`,
      data: data
    })
  },
  deleteComment (postId, commentId) {
    return api({
      method: 'delete',
      url: `${END_POINT}/${btoa(postId * 73 + 37)}/comment/${commentId}`
    })
  },
  photoLike (data) {
    return api({
      method: 'post',
      url: `${END_POINT}/photogroup/like/`,
      data: data
    })
  },
  photoRecent (data) {
    return api({
      method: 'post',
      url: `${END_POINT}/photogroup/recent/`,
      data: data
    })
  },
  frameLike (data) {
    return api({
      method: 'post',
      url: `${END_POINT}/frame/like/`,
      data: data
    })
  },
  frameRecent (data) {
    return api({
      method: 'post',
      url: `${END_POINT}/frame/recent/`,
      data: data
    })
  }
}

export default community