<template>
    <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold">{{ title }}</h1>
        <slot name="button" v-if="$slots.button" />
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: String,
});
</script>

<style scoped></style>
