import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home'
import Country from '@/components/Country'
import Sector from '@/components/Sector'

const routes = [
  { name: 'home', path: '/', component: Home },
  { name: 'country', path: '/country/:countryCode', component: Country, props: true },
  { name: 'sector', path: '/sector/:sectorCode', component: Sector, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
