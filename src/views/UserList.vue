<template>
  <div class="container py-4">
    <h2 class="mb-4">👥 사용자 리스트</h2>

    <!-- 🔍 검색창 -->
    <div class="mb-3 d-flex justify-content-between">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control w-50"
        placeholder="이름 또는 ID로 검색"
      />
    </div>

    <!-- 👤 사용자 테이블 -->
    <table class="table table-dark table-striped text-center align-middle">
      <thead>
        <tr>
          <th>ID</th>
          <th>이름</th>
          <th>메일 주소</th>
          <th>연락처</th>
          <th>수정</th>
          <th>관리자여부</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUserList" :key="user.userId">
          <td>{{ user.userId }}</td>
          <td>{{ user.userNm }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phoneNumber }}</td>
          <td>
            <button class="btn btn-sm btn-warning" @click="updatePoint(user)">Update</button>
          </td>

          <td>
            <select v-model="user.roleId" class="form-select form-select-sm">
              <option disabled value="">선택</option>
              <option value="2">Y</option>
              <option value="1">N</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from '../utils/axiosInstance'

const userList = ref([])
const searchQuery = ref('')  // 🔍 검색어 상태

// 🔎 검색 필터링된 리스트 계산
const filteredUserList = computed(() => {
  if (!searchQuery.value) return userList.value
  return userList.value.filter(user =>
    user.userId.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.userNm.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// 사용자 목록 로딩
onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:8080/admin/api/user/list')
    userList.value = res.data.map(user => ({
      ...user,
      addPoint: 0,
      deductPoint: 0
    }))
  } catch (err) {
    console.error('유저 목록 가져오기 실패', err)
  }
})

// 포인트 업데이트
const updatePoint = async (user) => {
  try {
   
    const payload = {
      userId: user.userId,
      roleId: user.roleId
    }

    await axios.post('http://localhost:8080/admin/api/user/modify', payload)

   

    alert(`✅ ${user.userNm}님의 업데이트 되었습니다.`)
  } catch (err) {
    console.error('업데이트 실패', err)
    alert('❌ 업데이트 실패')
  }
}
</script>

<style scoped>
.container {
  max-width: 1000px;
}
</style>
