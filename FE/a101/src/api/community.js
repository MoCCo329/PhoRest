import api from './api'

const END_POINT = 'community'


const community = {
  getPost (postId) {
    return api({
      method: 'get',
      url: `${END_POINT}/${postId}/`
    })
  },

  editPost (postId, data) {
    return api({
      method: 'put',
      url: `${END_POINT}/${postId}/`,
      data: data
    })
  },
  deletePost (postId) {
    return api({
      method: 'delete',
      url: `${END_POINT}/${postId}/`
    })
  },
  likePost (postId) {
    return api({
      method: 'post',
      url: `${END_POINT}/${postId}/like/`,
    })
  },
  bookmarkPost (postId) {
    return api({
      method: 'post',
      url: `${END_POINT}/${postId}/bookmark/`
    })
  },
  getComments (postId) {
    return api({
      method: 'get',
      url: `${END_POINT}/${postId}/comment/`
    })
  },
  createComments (postId, data) {
    return api({
      method: 'post',
      url: `${END_POINT}/${postId}/comment/`,
      data: data
    })
  },
  editComments (postId, commentId, data) {
    return api({
      method: 'put',
      url: `${END_POINT}/${postId}/comment/${commentId}`,
      data: data
    })
  },
  deleteComments (postId, commentId, data) {
    return api({
      method: 'delete',
      url: `${END_POINT}/${postId}/comment/${commentId}`
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