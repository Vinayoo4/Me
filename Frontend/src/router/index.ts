import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Home = () => import('../Home.vue')
const Certifications = () => import('../Certifications.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/certifications',
    name: 'Certifications',
    component: Certifications
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 