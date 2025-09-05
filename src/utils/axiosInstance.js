import axios from 'axios'
import router from '../router' // 반드시 Vue Router 경로에 맞게 import

const instance = axios.create({
  baseURL: 'http://15.165.125.244:8080', // 혹은 http://localhost:8080
  withCredentials: true // 쿠키가 필요한 경우
})

// ✅ 요청 시 accessToken 자동 삽입
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// ✅ 응답 시 401/403 에러 처리 (비로그인 또는 권한 없음)
instance.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status
    if (status === 401 || status === 403) {
      alert('로그인 후 이용해주세요.')
      //router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default instance
