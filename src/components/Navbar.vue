<script setup lang="ts">
import { AuthApi } from '@/data/apiService/authApi'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

async function logout() {
  const response = await AuthApi.logout()
  if (response?.status === 204) {
    router.push('/login')
  }
}
</script>

<template>
  <div>
    <div class="navbar bg-base-100 shadow-sm">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabindex="-1"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li><a>Home</a></li>
            <li>
              <a>Parent</a>
              <ul class="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <RouterLink to="/" class="btn btn-ghost text-xl font-bold">School Management</RouterLink>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1 gap-2">
          <li>
            <RouterLink to="/" active-class="bg-gray-100" exact-active-class="bg-gray-300"
              >Home</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/teachers" active-class="bg-gray-100" exact-active-class="bg-gray-300"
              >Teachers</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/students" active-class="bg-gray-100" exact-active-class="bg-gray-300"
              >Students</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/classes" active-class="bg-gray-100" exact-active-class="bg-gray-300"
              >Classes</RouterLink
            >
          </li>
        </ul>
      </div>
      <div class="navbar-end">
        <ul
          class="menu menu-horizontal items-center gap-2 px-1"
          v-if="!authStore.remainingIsAuthenticated"
        >
          <li>
            <RouterLink to="/login" active-class="bg-gray-100" exact-active-class="bg-gray-300"
              >Login</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/register" active-class="bg-gray-100" exact-active-class="bg-gray-300"
              >Register</RouterLink
            >
          </li>
        </ul>
        <ul class="menu menu-horizontal items-center gap-2 px-1" v-else>
          <li>
            <RouterLink
              :to="{ name: 'logout' }"
              active-class="bg-gray-100"
              exact-active-class="bg-gray-300"
              @click="logout"
              >Logout</RouterLink
            >
          </li>
        </ul>
        <a class="btn rounded-full">Dark Mode</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
