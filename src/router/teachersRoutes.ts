import { createRouter, createWebHistory } from 'vue-router'

const teachersRouter = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/teachers',
      name: 'teachers',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/teachers/TeachersView.vue'),
    },
    {
      path: '/teachers/create',
      name: 'create teacher',
      component: () => import('@/views/teachers/CreateTeacher.vue'),
    },
    {
      path: '/teachers/edit/:id',
      name: 'edit teacher',
      component: () => import('@/views/teachers/EditTeacher.vue'),
      props: true,
    },
  ],
})

export default teachersRouter;
