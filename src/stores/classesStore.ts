import { ClassesApi } from '@/data/apiService/classesApi';
import type { Course } from '@/models/class';
import { defineStore } from 'pinia';

export const useClassesStore = defineStore('classes', {
    state: () => ({
        classes: [],
    }),
    actions: {
        async fetchClasses({
            page = 1,
            perPage = 9,
            search = '',
        }: { page?: number; perPage?: number; search?: string } = {}) {
            try {
                const response = await ClassesApi.index({ page, perPage, search });
                this.classes = response?.data;
            } catch (error) {
                console.log(error);
            } finally {
            }
        },
    },
    getters: {
        remainingClasses: (state) => {
            return state.classes;
        },
    },
});
