import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Arrival from '@/views/Arrival.vue'
import Departure from '@/views/Departure.vue'
import Bus from '@/views/Bus.vue'
import Reviews from '@/views/Reviews.vue'
import Stop from '@/views/Stop.vue'
import Line from '@/views/Line.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/arrival',
      name: 'arrival',
      component: Arrival,
    },
    {
      path: '/departure',
      name: 'departure',
      component: Departure,
    },
    {
      path: '/bus',
      name: 'bus',
      component: Bus,
    },
    {
      path: '/line',
      name: 'line',
      component: Line
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: Reviews,
    },
    {
      path: '/stop',
      name: 'stop',
      component: Stop,
    }
  ],
})

export default router
