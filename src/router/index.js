import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'
import Review from '../views/Review.vue'
import ContactForm from '../views/ContactForm.vue'
import Cafe from '../views/Cafe.vue'
import Tistory from '../views/Tistory.vue'
import Tistoryc from '../views/TistoryC.vue'
import Tistoryce from '../views/TistoryCE.vue'
import TistoryPrice from '../views/TistoryPrice.vue'
import TistoryReview from '../views/TistoryReview.vue'
import TistoryAd from '../views/TistoryAd.vue'
import UserList from '../views/UserList.vue'
import UserRegister from '../views/UserListRegister.vue'
import Login from '../views/Login.vue'
import TistoryGuide from '../views/TistoryGuide.vue'

// Pinia 인증 상태 가져오기 (라우터 가드에서 사용)
import { useAuthStore } from '../store/auth'

const routes = [
  { path: '/', component: Home },
  {
    path: '/detail/:productId',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/review/',
    name: 'Review',
    component: Review
  },
  {
    path: '/contactForm/',
    name: 'ContactForm',
    component: ContactForm
  },
  {
    path: '/cafe/',
    name: 'Cafe',
    component: Cafe
  },
  {
    path: '/tistory/',
    name: 'Tistory',
    component: Tistory
  },
  {
    path: '/tistoryc/',
    name: 'Tistoryc',
    component: Tistoryc
  },
  {
    path: '/tistoryce/',
    name: 'Tistoryce',
    component: Tistoryce
  },
  {
    path: '/tistoryreview/',
    name: 'TistoryReview',
    component: TistoryReview
  },
  {
    path: '/tistoryguide/',
    name: 'TistoryGuide',
    component: TistoryGuide
  },
  ,
  {
    path: '/tistoryad/',
    name: 'TistoryAd',
    component: TistoryAd
  },
  {
    path: '/tistoryprice/',
    name: 'TistoryPrice',
    component: TistoryPrice,
    meta: { requiresAuth: true } // 보호
  },
  {
    path: '/userlist/',
    name: 'UserList',
    component: UserList,
    meta: { requiresAuth: true } // 보호
  },
  {
    path: '/userRegister/',
    name: 'UserRegister',
    component: UserRegister
  },
  {
    path: '/login/',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ✅ 라우터 가드: 로그인 여부 확인
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // 새로고침 등으로 store가 초기화됐을 경우 복구
  if (!authStore.accessToken) {
    authStore.loadFromStorage()
  }

  // 로그인 필요한데 accessToken이 없으면 login 페이지로 리디렉트
  if (to.meta.requiresAuth && !authStore.accessToken) {
    alert('로그인이 필요합니다.')
    next('/login')
  } else {
    next()
  }
})

export default router
