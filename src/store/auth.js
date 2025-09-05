// store/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: '',
    refreshToken: '',
    user: null,
  }),
  actions: {
    setAuth({ accessToken, refreshToken, user }) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      this.user = user

      // 로컬스토리지 저장
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('user', JSON.stringify(user))
    },
    loadFromStorage() {
      this.accessToken = localStorage.getItem('accessToken') || ''
      this.refreshToken = localStorage.getItem('refreshToken') || ''
      this.user = JSON.parse(localStorage.getItem('user')) || null
    },
    logout() {
      this.accessToken = ''
      this.refreshToken = ''
      this.user = null
      localStorage.clear()
    }
  }
})
