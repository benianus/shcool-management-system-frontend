<template>
  <div class="">
    <Title title="Teachers" btnTitle="Teacher" />
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
              <button class="btn bg-orange-200 rounded-full" v-if="teacher.status">Active</button>
              <button class="btn bg-gray-200 rounded-full" v-else>Passive</button>
            </td>
            <td><button class="btn border-2 rounded-full">View</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <slot name="pagination" />
  </div>
</template>

<script setup lang="ts">
import { useTeacherStore } from '@/stores/teachers'
import { onMounted, ref, watch } from 'vue'
import Loader from '../Loader.vue'
import Title from '../Title.vue'
import { useSearchbarStore } from '@/stores/searchbar'
import { usePaginationStore } from '@/stores/pagination'

const loading = ref(false)
const teachersStore = useTeacherStore()
const searchbarStore = useSearchbarStore()
const paginationStore = usePaginationStore()

watch(
  () => searchbarStore.filter,
  (newValue) => {
    teachersStore.filterTeachers(newValue)
  },
)

watch(
  () => paginationStore.page,
  async (newValue) => {
    loading.value = true
    paginationStore.disablePrevBtn = newValue === 1
    const response = await teachersStore.fetchTeachers(newValue)
    paginationStore.disableNextBtn = response?.data.length === 0
    loading.value = false
  },
)

onMounted(async () => {
  loading.value = true
  await teachersStore.fetchTeachers()
  loading.value = false
})
</script>

<style scoped></style>
