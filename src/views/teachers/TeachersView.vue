<template>
  <div class="">
    <TeachersTable>
      <template #searchbar><Searchbar class="mb-1 w-full rounded-full" /></template>
      <template #pagination><Pagination /></template>
    </TeachersTable>
  </div>
</template>

<script setup lang="ts">
import Pagination from '@/components/Pagination.vue'
import Searchbar from '@/components/Searchbar.vue'
import TeachersTable from '@/components/teachers/TeachersTable.vue'
</script>

<style scoped></style>
