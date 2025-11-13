<template>
    <div class="">
        <slot name="title" v-if="$slots.title" />
        <slot name="searchbar" v-if="$slots.searchbar" />
        <!-- Loader -->
        <Loader :loading="loading" />
        <div class="overflow-x-auto rounded-3xl border-4 border-gray-200 bg-base-100">
            <table class="table">
                <!-- head -->
                <thead class="bg-gray-100 border-b-2">
                    <tr>
                        <th>Course</th>
                        <th>Teacher</th>
                        <th>Students enrolled</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr
                        v-for="course in classesStore.classes.data"
                        :key="course.id"
                        class="border-b border-gray-200"
                    >
                        <td>{{ course.name }}</td>
                        <td>{{ course.teacher_name }}</td>
                        <td>{{ course.students_enrolled }}</td>
                        <td>
                            <RouterLink :to="{ name: 'edit-student', params: { id: course.id } }">
                                <button class="btn rounded-full">Edit</button>
                            </RouterLink>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <slot name="pagination" v-if="$slots.pagination" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Loader from '../Loader.vue';
import { useSearchbarStore } from '@/stores/searchbarStore';
import { usePaginationStore } from '@/stores/paginationStore';
import { RouterLink } from 'vue-router';
import { useClassesStore } from '@/stores/classesStore';

const loading = ref(false);
const classesStore = useClassesStore();
const searchbarStore = useSearchbarStore();
const paginationStore = usePaginationStore();

watch([() => paginationStore.page, () => searchbarStore.filter], async ([page, filter]) => {
    loading.value = true;
    paginationStore.disablePrevBtn = page === 1;
    const response = await classesStore.fetchClasses({ page, search: filter });
    paginationStore.disableNextBtn = page === classesStore.classes.last_page;
    loading.value = false;
});

onMounted(async () => {
    loading.value = true;
    await classesStore.fetchClasses();
    loading.value = false;
});
</script>

<style scoped></style>
