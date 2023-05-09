import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/forms',
      name: 'forms',
      component: () => import('../pages/Forms.vue')
    }
  ]
})

export default router
