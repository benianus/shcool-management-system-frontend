<template>
    <div class="">
        <TeachersTable>
            <template #title>
                <Title title="Teachers" btn-title="Teacher" class="my-4">
                    <template #button>
                        <CustomButton btnTitle="Teacher" pathName="create teacher" />
                    </template>
                </Title>
            </template>
            <template #searchbar>
                <Searchbar class="mb-3 w-full rounded-full" />
            </template>
            <template #pagination>
                <Pagination />
            </template>
        </TeachersTable>
    </div>
</template>

<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
import Searchbar from '@/components/Searchbar.vue';
import TeachersTable from '@/components/teachers/TeachersTable.vue';
import Title from '@/components/TitleBar.vue';
import CustomButton from '@/components/CustomButton.vue';
</script>

<style scoped></style>
