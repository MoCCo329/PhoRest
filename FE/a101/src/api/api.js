import axios from 'axios'

const HOST = 'https://i7a101.p.ssafy.io/api/'

axios.defaults.withCredentials = true
export const api = axios.create({
  baseURL: HOST
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

export default api