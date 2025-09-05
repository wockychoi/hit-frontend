import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // <= 이거 추가했는지 확인
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import { createPinia } from 'pinia'


createApp(App)
  .use(router)  // <= 이거 꼭 필요
  .use(createPinia())
  .mount('#app');
