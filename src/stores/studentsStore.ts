import { StudentApi } from '@/data/apiService/studentsApi';
import type { Student } from '@/models/student';
import { defineStore } from 'pinia';
import { number } from 'zod';

export const useStudentsStore = defineStore('students', {
    state: () => ({
        students: {},
        student: {},
    }),
    actions: {
        async fetchStudents({
            page = 1,
            perPage = 9,
            search = '',
        }: { page?: number; perPage?: number; search?: string } = {}) {
            const response = await StudentApi.get({ page, perPage, search });
            console.log(response?.data);
            this.students = response?.data;
        },
        async fetchStudent({ id }: { id?: string | string[] }) {
            const response = await StudentApi.show({ id });
            this.student = response?.data;
        },
    },
    getters: {},
});
