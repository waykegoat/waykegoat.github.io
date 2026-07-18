import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { preferredLocale, setLocale } from '@/i18n'

const routes: RouteRecordRaw[] = [
  { path: '/:locale(en)?', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/admin', name: 'admin', component: () => import('@/views/AdminView.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.name === from.name) return false
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  if (to.name !== 'home') {
    setLocale('ru')
    return
  }
  if (!to.params.locale && preferredLocale() === 'en') {
    return { path: '/en', query: to.query, hash: to.hash }
  }
  setLocale(to.params.locale === 'en' ? 'en' : 'ru')
})
