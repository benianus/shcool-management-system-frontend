<template>
  <div class="place-items-center mb-3">
    <LoaderCircle class="animate-spin" v-show="loading" />
  </div>
</template>

<script setup lang="ts">
import { LoaderCircle } from 'lucide-vue-next'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

</script>

<style scoped></style>
