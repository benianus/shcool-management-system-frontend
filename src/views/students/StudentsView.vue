<template>
  <div class="">
    <StudentsTable>
      <template #title>
        <Title title="Students" btn-title="Teacher" class="my-4">
          <template #button>
            <CustomButton btnTitle="Student" pathName="create teacher" />
          </template>
        </Title>
      </template>
      <template #searchbar>
        <Searchbar class="mb-3 w-full rounded-full" />
      </template>
      <template #pagination>
        <Pagination />
      </template>
    </StudentsTable>
  </div>
</template>

<script setup lang="ts">
import Pagination from '@/components/Pagination.vue'
import Searchbar from '@/components/Searchbar.vue'
import Title from '@/components/TitleBar.vue'
import CustomButton from '@/components/CustomButton.vue'
import StudentsTable from '@/components/students/StudentsTable.vue'
</script>

<style scoped></style>
