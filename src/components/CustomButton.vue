<template>
    <div>
        <RouterLink :to="{ name: pathName }">
            <button class="btn btn-info rounded-full">+ Add {{ btnTitle }}</button>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps({
    btnTitle: String,
    pathName: String,
});
</script>

<style scoped></style>
