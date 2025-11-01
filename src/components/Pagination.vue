<template>
  <div class="join w-full place-content-center my-3 fixed bottom-0 left-0">
    <button
      class="join-item btn rounded-l-full"
      @click="paginationStore.returnToPrevPage"
      :disabled="paginationStore.disablePrevBtn"
    >
      «
    </button>
    <button class="join-item btn">Page {{ paginationStore.page }}</button>
    <button
      class="join-item btn rounded-r-full"
      @click="paginationStore.goToNextPage"
      :disabled="paginationStore.disableNextBtn"
    >
      »
    </button>
  </div>
</template>

<script setup lang="ts">
import { usePaginationStore } from '@/stores/pagination'
const paginationStore = usePaginationStore()
</script>

<style></style>
