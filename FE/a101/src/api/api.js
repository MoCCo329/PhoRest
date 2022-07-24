import axios from 'axios'

const HOST = '서버주소'

export const api = axios.create({
  baseURL : HOST,
})

api.interceptors.request.use(
  config => {
  const token = localStorage.getItem("token")

  if (!token) return config

  config.headers.Authorization = `Token ${token}`
  return config
  },
  error => {
    return Promise.reject(error)
  }
)