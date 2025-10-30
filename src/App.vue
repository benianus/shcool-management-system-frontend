<script setup lang="ts">
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar />
  <div class="max-w-5xl mx-auto bg">
    <RouterView />
  </div>
</template>

<style scoped></style>
