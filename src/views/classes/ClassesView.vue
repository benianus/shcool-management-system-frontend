<template>
    <div class="">
        <ClassesTable>
            <template #title>
                <Title title="Classes" class="my-4">
                    <template #button>
                        <CustomButton btnTitle="Class" pathName="create-class" />
                    </template>
                </Title>
            </template>
            <template #searchbar>
                <Searchbar class="mb-3 w-full rounded-full" />
            </template>
            <template #pagination>
                <Pagination />
            </template>
        </ClassesTable>
    </div>
</template>

<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
import Searchbar from '@/components/Searchbar.vue';
import Title from '@/components/TitleBar.vue';
import CustomButton from '@/components/CustomButton.vue';
import ClassesTable from '@/components/classes/ClassesTable.vue';
</script>

<style scoped></style>
