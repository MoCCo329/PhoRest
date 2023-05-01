import api from "./api"

const END_POINT = "mypage"

const mypage = {
  sharePost(postId) {
    return api({
      method: "post",
      url: `${END_POINT}/${btoa(postId * 73 + 37)}/share/`,
    })
  },
  userDetail(username) {
    return api({
      method: "get",
      url: `${END_POINT}/${username}/`,
    })
  },
  ownPost (postId) {
    return api({
      method: 'post',
      url: `${END_POINT}/${btoa(postId * 73 + 37)}/add`
    })
  },
  bookmarked (username) {
    return api({
      method: 'get',
      url: `${END_POINT}/${username}/bookmark`
    })
  },
}

export default mypage
