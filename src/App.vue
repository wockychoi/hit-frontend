<template>
  <div id="app">
    <!-- 네비게이션 -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container px-4 px-lg-5">
        <router-link class="navbar-brand" to="/">Hit Company</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <!-- 로그인한 사용자만 접근 -->
            <!-- 사용자 리스트: 특정 ID만 보이게 -->
            <li class="nav-item" v-if="isLoggedIn && user.roleId === '2'">
              <router-link class="nav-link" to="/userList">사용자리스트</router-link>
            </li>
            <li class="nav-item" style="display: none;" >
              <router-link class="nav-link" to="/userRegister">회원가입</router-link>
            </li>

            <!-- 로그인 상태에 따른 사용자 정보/버튼 -->
            <li class="nav-item" v-if="isLoggedIn">
              <span class="nav-link disabled">
                {{ user.userNm }}님 ({{ user.pointBalance }}P)
              </span>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <a class="nav-link" href="#" @click.prevent="logout">로그아웃</a>
            </li>
            <li class="nav-item" v-else>
              <router-link class="nav-link" to="/login">로그인</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- 라우터 뷰 -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from './store/auth'
import { useRouter } from 'vue-router'

const showTistory = ref(false)

const authStore = useAuthStore()
const router = useRouter()

// 페이지 새로고침 시 저장된 사용자 정보 복원
onMounted(() => {
  authStore.loadFromStorage()
})

const isLoggedIn = computed(() => !!authStore.accessToken)
const user = computed(() => authStore.user || { name: '', point: 0 })

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css');
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');

body {
  font-family: 'Noto Sans KR', sans-serif;
}

.submenu-container {
  position: relative;
}

.submenu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0.5rem 0;
  list-style: none;
  min-width: 180px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  z-index: 1000;
}

.submenu-item {
  display: block;
  padding: 0.5rem 1rem;
  color: #333;
  text-decoration: none;
}

.submenu-item:hover {
  background-color: #f8f9fa;
}
</style>
