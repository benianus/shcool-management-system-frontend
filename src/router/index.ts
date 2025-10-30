import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/teachers',
      name: 'teachers',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/teachers/TeachersView.vue'),
    },
    {
      path: '/students',
      name: 'students',
      component: () => import('../views/students/StudentsView.vue'),
    },
    {
      path: '/classes',
      name: 'classes',
      component: () => import('../views/classes/ClassesView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Auth/RegisterView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
