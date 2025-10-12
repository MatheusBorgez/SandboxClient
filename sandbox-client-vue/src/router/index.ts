import { createRouter, createWebHistory } from 'vue-router'
import MoviesView from "../views/MoviesView.vue"

const routes = [
  { path: '/', name: 'movies', component: MoviesView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [],
})

export default router
