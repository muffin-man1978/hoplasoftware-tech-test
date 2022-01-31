import { createRouter, createWebHashHistory } from 'vue-router'
import ArtistCollections from '../components/ArtistCollections.vue';

const routes = [
  {
    path: '/',    
    component: ArtistCollections
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
