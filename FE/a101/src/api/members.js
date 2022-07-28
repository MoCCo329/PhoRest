import api from './api'

const END_POINT = 'members'


const members = {
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
    // .then((result) => {
    //   dispatch(setToken(''))
    //   localStorage.setItem('token', '')
    //   navigate('/')
    // })
    // .catch((error) => {
    //   dispatch(setAuthError(error.response))
    //   console.error(error)
    // })
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

export default members