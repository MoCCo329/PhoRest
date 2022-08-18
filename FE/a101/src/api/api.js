import axios from 'axios'

const HOST = 'https://i7a101.p.ssafy.io/api/'

axios.defaults.withCredentials = true
export const api = axios.create({
  baseURL: HOST
})

api.interceptors.request.use(
  config => {
  const token = localStorage.getItem("token")
  // localStorage.setItem('token', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMzc2NDg4OTAyQGsiLCJhdXRoIjoiIiwiZXhwIjoxNjYwOTExMzY4fQ.73AcbUvM9n3Mkf9pjaLonTvoHudRJWf_r4vpY9DIiNilIck3S828fHFmxqoRFiOXyBPaK0wbAxnGWx33K9GU4Q')
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMzc2NDg4OTAyQGsiLCJhdXRoIjoiIiwiZXhwIjoxNjYwOTExMzY4fQ.73AcbUvM9n3Mkf9pjaLonTvoHudRJWf_r4vpY9DIiNilIck3S828fHFmxqoRFiOXyBPaK0wbAxnGWx33K9GU4Q'
  if (!token) return config

  config.headers.Authorization = `${token}`
  return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default api