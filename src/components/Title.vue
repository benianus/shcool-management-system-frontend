<template>
  <div class="flex justify-between items-center">
    <h1 class="text-3xl font-bold my-4">{{ title }}</h1>
    <button class="btn btn-primary bg-indigo-500 rounded-full">+ Add {{ btnTitle }}</button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  btnTitle: String,
})
</script>

<style scoped></style>
