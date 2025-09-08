<template>
  <div class="register-container">
    <div class="form-box">
      <h2 class="mb-4 text-center">📝 회원가입</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label class="form-label">아이디</label>
          <div class="input-group">
            <input v-model="form.userId" type="text" class="form-control" required />
            <button class="btn btn-outline-secondary" type="button" @click="checkDuplicateId">
              중복확인
            </button>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">비밀번호</label>
          <input v-model="form.password" type="password" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">회사명</label>
          <input v-model="form.userNm" type="text" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">이메일</label>
          <input v-model="form.email" type="email" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">연락처</label>
          <input v-model="form.phoneNumber" type="text" class="form-control" required />
        </div>

        <div class="mb-3" style="display: none;">
          <label class="form-label">추천인 (선택)</label>
          <input v-model="form.recommenderId" type="text" class="form-control" />
        </div>

        <div class="d-grid mt-4">
          <button class="btn btn-primary" type="submit">회원가입</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import axios from 'axios'
import { encrypt } from '../utils/encryptPassword' // 암호화 함수 import
import { useRouter } from 'vue-router'

const router = useRouter()
// 회원가입 폼 데이터
const form = reactive({
  userId: '',
  password: '',
  userNm: '',
  email: '',
  phoneNumber: '',
  recommenderId: ''
})

// 중복확인 여부
const isDuplicateChecked = ref(false)

// userId가 바뀌면 중복확인 다시 하도록 초기화
watch(() => form.userId, () => {
  isDuplicateChecked.value = false
})

const checkDuplicateId = async () => {
  if (!form.userId) {
    alert('아이디를 입력해주세요.')
    return
  }

  try {
    //const res = await axios.get(`http://15.165.125.244:8080/admin/api/user/duplicate?userId=${form.userId}`)
    const res = await axios.get(`http://localhost:8080/admin/api/user/duplicate?userId=${form.userId}`)
    if (res.data.userId) {
      alert('❌ 이미 사용 중인 아이디입니다.')
      isDuplicateChecked.value = false
    } else {
      alert('✅ 사용 가능한 아이디입니다.')
      isDuplicateChecked.value = true
    }
  } catch (err) {
    alert('❌ 아이디 중복 확인에 실패했습니다.')
    console.error(err)
    isDuplicateChecked.value = false
  }
}

const submitForm = async () => {
  if (!form.userId || !form.password || !form.userNm || !form.email || !form.phoneNumber) {
    alert('필수 항목을 모두 입력해주세요.')
    return
  }

  if (!isDuplicateChecked.value) {
    alert('❗ 아이디 중복 확인을 먼저 해주세요.')
    return
  }

  try {
    const encryptedPassword = encrypt(form.password)

    const payload = {
      userId: form.userId,
      password: encryptedPassword,
      userNm: form.userNm,
      email: form.email,
      phoneNumber: form.phoneNumber,
      recommenderId: form.recommenderId
    }

    //const res = await axios.post('http://15.165.125.244:8080/admin/api/user/register', payload)
    const res = await axios.post('http://localhost:8080/admin/api/user/register', payload)
    

    alert('✅ 회원가입이 완료되었습니다.')
    router.push('/login') 
    
  } catch (err) {
    alert('❌ 회원가입에 실패했습니다.')
    console.error(err)
  }
}

</script>

<style scoped>
.register-container {
  min-height: 100vh;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-box {
  background-color: white;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}
</style>
