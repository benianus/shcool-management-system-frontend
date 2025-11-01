<template>
  <div class="">
    <slot name="title" v-if="$slots.title" />
    <slot name="searchbar" v-if="$slots.searchbar" />
    <!-- Loader -->
    <Loader :loading="loading" />
    <div class="overflow-x-auto rounded-3xl border-4 border-gray-200 bg-base-100">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Class</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="teacher in teachersStore.teachers" :key="teacher.id">
            <td>{{ teacher.name }}</td>
            <td>{{ teacher.email }}</td>
            <td>{{ teacher.class }}</td>
            <td>
              <button class="btn btn-warning rounded-full" v-if="teacher.status">Active</button>
              <button class="btn btn-soft btn-accent bg-gray-200 rounded-full" v-else>
                Passive
              </button>
            </td>
            <td>
              <RouterLink :to="{ name: 'edit teacher', params: { id: teacher.id } }">
                <button class="btn border-2 rounded-full">Edit</button>
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <slot name="pagination" v-if="$slots.pagination" />
  </div>
</template>

<script setup lang="ts">
import { useTeacherStore } from '@/stores/teachers'
import { onMounted, ref, watch } from 'vue'
import Loader from '../Loader.vue'
import { useSearchbarStore } from '@/stores/searchbar'
import { usePaginationStore } from '@/stores/pagination'
import { RouterLink } from 'vue-router'

const loading = ref(false)
const teachersStore = useTeacherStore()
const searchbarStore = useSearchbarStore()
const paginationStore = usePaginationStore()

watch([() => paginationStore.page, () => searchbarStore.filter], async ([page, filter]) => {
  loading.value = true
  paginationStore.disablePrevBtn = page === 1
  const response = await teachersStore.fetchTeachers({ page, filter })
  paginationStore.disableNextBtn = response?.data.length === 0
  loading.value = false
})

onMounted(async () => {
  loading.value = true
  await teachersStore.fetchTeachers()
  loading.value = false
})
</script>

<style scoped></style>
