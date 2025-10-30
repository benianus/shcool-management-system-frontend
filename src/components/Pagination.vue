<template>
  <div class="join w-full place-content-center my-3">
    <button
      class="join-item btn"
      @click="paginationStore.returnToPrevPage"
      :disabled="paginationStore.disablePrevBtn"
    >
      «
    </button>
    <button class="join-item btn">Page {{ paginationStore.page }}</button>
    <button
      class="join-item btn"
      @click="paginationStore.goToNextPage"
      :disabled="paginationStore.disableNextBtn"
    >
      »
    </button>
  </div>
</template>

<script setup lang="ts">
import { usePaginationStore } from '@/stores/pagination'
import { useTeacherStore } from '@/stores/teachers'
import { ref } from 'vue'

const paginationStore = usePaginationStore()

// async function returnToPrevPage() {
//   if (page.value <= 1) {
//     disablePrevBtn.value = true
//     await teachersStore.fetchTeachers(page.value)
//     return
//   }
//   await teachersStore.fetchTeachers(page.value)
// }

// async function goToNextPage() {
//   const response = await teachersStore.fetchTeachers(page.value)
//   if (!response?.data.length) {
//     disableNextBtn.value = true
//     return
//   }
// }
</script>

<style lang="scss" scoped></style>
