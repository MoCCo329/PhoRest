import api from "./api";

// 내 정보, 기록들을 불러오기 위한 API
const END_POINT = "mypage";

const mypage = {
  sharePost(postId) {
    return api({
      method: "post",
      url: `mypage/${btoa(postId * 73 - 37)}/share/`,
    });
  },
  userDetail(username) {
    return api({
      method: "get",
      url: `${END_POINT}/${username}/`,
    });
  },
  ownPost (postId) {
    return api({
      method: 'post',
      url: `mypage/${btoa(postId * 73 + 37)}/add`
    })
  }
}

export default mypage;
