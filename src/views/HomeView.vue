<template>
    <TitleBar title="Dashboard" class="my-4" />
    <div class="flex my-4 gap-4 h-dvh">
        <div class="flex flex-col gap-4 w-2/3">
            <TitleBar title="Attendance overview" />
            <Card />
            <TitleBar title="Announcements" />
            <Card />
            <Card />
        </div>
        <div class="flex flex-col gap-4 w-1/3 h-full">
            <TitleBar title="Upcoming events" />
            <Card class="h-1/3" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Card from '@/components/Card.vue';
import TitleBar from '@/components/TitleBar.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const posts = ref([]);

onMounted(async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/2');
    posts.value = response.data;
});
</script>

<style scoped></style>
