<template>
  <div class="login-container">
    <div class="form-box">
      <h2 class="text-center">
        <span class="title-text">로그인</span>
      </h2>

      <form @submit.prevent="submitLogin">
        <div class="mb-3">
          <label class="form-label">아이디</label>
          <input v-model="form.userId" type="text" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">비밀번호</label>
          <input v-model="form.password" type="password" class="form-control" required />
        </div>

        <div class="d-grid mt-4">
          <button type="submit" class="btn-submit">로그인</button>
        </div>
        <!-- 🔽 회원가입 버튼 추가 -->
        <div class="d-grid mt-2">
          <router-link to="/userRegister" class="btn-signup">회원가입</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from '../utils/axiosInstance'  // 토큰 자동 포함된 axios 사용 권장
import { encrypt } from '../utils/encryptPassword'
import { useAuthStore } from '../store/auth'  // 🔸 store에서 만든 인증 상태 사용
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  userId: '',
  password: ''
})

const submitLogin = async () => {
  if (!form.userId || !form.password) {
    alert('아이디와 비밀번호를 입력해주세요.')
    return
  }

  try {
    const encryptedPassword = encrypt(form.password)

    const payload = {
      userId: form.userId,
      password: encryptedPassword
    }

    const res = await axios.post('/admin/api/user/login', payload)

    const { accessToken, refreshToken, user } = res.data

    // 🔹 store에 저장
    authStore.setAuth({ accessToken, refreshToken, user })

    alert('✅ 로그인 성공!')
    router.push('/')  // 🔹 로그인 성공 시 홈으로 이동
  } catch (err) {
    alert('❌ 로그인 실패. 아이디 또는 비밀번호를 확인해주세요.')
    console.error(err)
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-box {
  background-color: #2a2a2a;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  color: white;
}

.form-label {
  color: #e0e0e0;
}

.form-control {
  background-color: white;
  border: none;
  border-radius: 6px;
  padding: 10px;
  font-size: 16px;
  width: 100%;
}

.btn-submit {
  background-color: #f1c40f;
  border: none;
  padding: 10px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 16px;
  color: black;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: #d4ac0d;
}

.title-text {
  color: #f1c40f;
  font-size: 24px;
  font-weight: bold;
  margin-left: 8px;
}
.btn-signup {
  display: block;
  text-align: center;
  background-color: #0d6efd;
  border: 2px solid #0d6efd;
  color: #ffffff;
  padding: 10px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-signup:hover {
  background-color: #f1c40f;
  color: black;
}
</style>
