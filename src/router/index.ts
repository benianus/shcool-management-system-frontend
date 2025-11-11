import { useAuthStore } from '@/stores/authStore';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
            beforeEnter: async (to, from) => {
                const authStore = useAuthStore();
                if (!authStore.isAuthenticated) {
                    return { name: 'login' };
                }
            },
        },
        {
            path: '/teachers',
            name: 'teachers',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/teachers/TeachersView.vue'),
            beforeEnter: async (to, from) => {
                const authStore = useAuthStore();
                if (!authStore.isAuthenticated) {
                    return { name: 'login' };
                }
            },
        },
        {
            path: '/teachers/create',
            name: 'create teacher',
            component: () => import('@/views/teachers/CreateTeacherView.vue'),
            beforeEnter: async (to, from) => {
                const authStore = useAuthStore();
                if (!authStore.isAuthenticated) {
                    return { name: 'login' };
                }
            },
        },
        {
            path: '/teachers/edit/:id',
            name: 'edit teacher',
            component: () => import('@/views/teachers/EditTeacherView.vue'),
            props: true,
            beforeEnter: async (to, from) => {
                const authStore = useAuthStore();
                if (!authStore.isAuthenticated) {
                    return { name: 'login' };
                }
            },
        },
        {
            path: '/students',
            name: 'students',
            component: () => import('../views/students/StudentsView.vue'),
            beforeEnter: async (to, from) => {
                const authStore = useAuthStore();
                if (!authStore.isAuthenticated) {
                    return { name: 'login' };
                }
            },
        },
        {
            path: '/students/create',
            name: 'create-student',
            component: () => import('../views/students/CreateStudentView.vue'),
            beforeEnter: async (to, from) => {
                const authStore = useAuthStore();
                if (!authStore.isAuthenticated) {
                    return { name: 'login' };
                }
            },
        },
        {
            path: '/students/edit/:id',
            name: 'edit-student',
            component: () => import('../views/students/EditStudentView.vue'),
            props: true,
            beforeEnter: async (to, from) => {
                const authStore = useAuthStore();
                if (!authStore.isAuthenticated) {
                    return { name: 'login' };
                }
            },
        },
        {
            path: '/classes',
            name: 'classes',
            component: () => import('../views/classes/ClassesView.vue'),
            beforeEnter: async (to, from) => {
                const authStore = useAuthStore();
                if (!authStore.isAuthenticated) {
                    return { name: 'login' };
                }
            },
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Auth/LoginView.vue'),
            beforeEnter: async (to, from) => {
                const authStore = useAuthStore();
                if (authStore.isAuthenticated) {
                    return { name: 'home' };
                }
            },
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/Auth/RegisterView.vue'),
            beforeEnter: async (to, from) => {
                const authStore = useAuthStore();
                if (authStore.isAuthenticated) {
                    return { name: 'home' };
                }
            },
        },
        {
            path: '/logout',
            name: 'logout',
            component: {},
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not found',
            component: () => import('../views/NotFoundView.vue'),
        },
    ],
});

export default router;
