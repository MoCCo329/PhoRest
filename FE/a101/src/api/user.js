import api from './api'

const END_POINT = 'user'


const user = {
  login (data) {
    return api({
      method: 'post',
      url: `${END_POINT}/login/`,
      data: data,
    })
  },

  logout() {
    return api({
      method: 'post',
      url: `${END_POINT}/logout/`,
    })
  },

  signup(data) {
    return api({
      method: 'post',
      url: `${END_POINT}/signup/`,
      data : data,
    })
  },

  profileEdit(data) {
    return api({
      method: 'put',
      url: `${END_POINT}/edit/`,
      data : data,
    })
  },

  profileEditPw(data) {
    return api({
      method: 'put',
      url: `${END_POINT}/editpw/`,
      data : data,
    })
  },
  
  currentUser() {
    return api({
      method: 'get',
      url: `${END_POINT}/currentuser/`,
    })
  },

  follow(username) {
    return api({
      method: 'post',
      url: `${END_POINT}/${username}/follow`,
    })
  },

  followingList() {
    return api({
      method: 'get',
      url: `${END_POINT}/following/`,
    })
  },

  kakaoSignup(code) {
    return api({
      method: 'get',
      url: `${END_POINT}/kakao?code=${code}`,
    })
  }
}

export default user