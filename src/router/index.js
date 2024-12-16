import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SharedView from '@/views/SharedView.vue'
import AnimView from '@/views/AnimView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/anim',
    name: 'anim',
    component: AnimView
  },
  {
    path: '/shared/:username',
    name: 'shared',
    component: SharedView,
    param: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
