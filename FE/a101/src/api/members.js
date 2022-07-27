import api from './api'

const END_POINT = 'members'


const accounts = {
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
      body : data
    })
  },
  currentUser() {
    return api({
      method: 'get',
      url: `${END_POINT}/user/`,
    })
  },
}

export default accounts