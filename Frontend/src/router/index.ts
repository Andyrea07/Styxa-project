import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/country',
      name: 'country',
      component: () => import('../views/CountryView.vue'),
    },
    {
      path: '/cities',
      name: 'cities',
      component: () => import('../views/CitiesView.vue'),
    },
    {
      path: '/pointOfInterest',
      name: 'pointOfInterest',
      component: () => import('../views/PointOfInterest.vue'),
    },
    {
      path: '/country/:id',
      name: 'countryById',
      component: () => import('../views/CountryDetailView.vue'),
    },
    {
      path: '/cities/:id',
      name: 'citiesById',
      component: () => import('../views/CityDetailView.vue'),
    },
    {
      path: '/pointofinterest/:id',
      name: 'pointofinterestById',
      component: () => import('../views/PointOfInterestDetailView.vue'),
    },
  ],
})

export default router
