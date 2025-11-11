<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <div
        class="flex justify-center items-center flex-col bg-gray-500 text-white text-4xl h-full font-bold"
    >
        <h1>404 | NOT FOUND</h1>
        <RouterLink to="/" class="text-sm my-4 text-blue-800 underline"
            >Return to Home page</RouterLink
        >
    </div>
</template>

<style scoped>
div {
    width: 100%;
    background-color: red;
}
</style>
