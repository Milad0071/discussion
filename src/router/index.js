import { createRouter, createWebHashHistory } from 'vue-router'
import DiscussionComp from '../components/DiscussionComp.vue'

const routes = [
  {
    path: '/',
    name: 'discussion',
    component: DiscussionComp
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
