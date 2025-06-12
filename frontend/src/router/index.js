import { createMemoryHistory, createRouter } from 'vue-router'

import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import Register from '@/views/Register.vue';
import CatFacts from '@/views/CatFacts.vue';
import Likes from '@/views/Likes.vue';
import Popular from '@/views/Popular.vue';

const routes = [
  { path: '/', component: Home }, 
  { path: '/login', component: Login }, 
  { path: '/register', component: Register }, 
  { path: '/facts', component: CatFacts }, 
  { path: '/likes', component: Likes }, 
  { path: '/popular', component: Popular }, 
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;