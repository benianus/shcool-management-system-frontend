<script setup lang="ts">
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar />
  <div class="max-w-7xl mx-auto h-full">
    <RouterView />
  </div>
</template>

<style scoped></style>
