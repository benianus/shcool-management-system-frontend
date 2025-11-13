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
                        <th>Name</th>
                        <th>Grade</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr
                        v-for="student in studentsStore.students.data"
                        :key="student.student_id"
                        class="border-b border-gray-200"
                    >
                        <td>{{ student.student_name }}</td>
                        <td>{{ student.grade }}</td>
                        <td>
                            <button class="btn btn-warning rounded-full" v-if="student.status">
                                Active
                            </button>
                            <button class="btn btn-soft btn-accent bg-gray-200 rounded-full" v-else>
                                Passive
                            </button>
                        </td>
                        <td>
                            <RouterLink
                                :to="{ name: 'edit-student', params: { id: student.student_id } }"
                            >
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
import { useStudentsStore } from '@/stores/studentsStore';

const loading = ref(false);
const studentsStore = useStudentsStore();
const searchbarStore = useSearchbarStore();
const paginationStore = usePaginationStore();

watch([() => paginationStore.page, () => searchbarStore.filter], async ([page, filter]) => {
    loading.value = true;
    paginationStore.disablePrevBtn = page === 1;
    const response = await studentsStore.fetchStudents({ page, search: filter });
    paginationStore.disableNextBtn = studentsStore.students.last_page == page;
    loading.value = false;
});

onMounted(async () => {
    loading.value = true;
    await studentsStore.fetchStudents();
    loading.value = false;
});
</script>

<style scoped></style>
