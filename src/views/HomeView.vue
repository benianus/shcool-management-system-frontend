<template>
    <div>Dashboard</div>
    <p>Work In Progress</p>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

const posts = ref([]);

onMounted(async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/2');
    posts.value = response.data;
});
</script>

<style scoped></style>
