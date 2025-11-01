import { TeacherApi } from '@/data/apiService/teachers'
import type { Teacher } from '@/models/teacher'
import { defineStore } from 'pinia'

export const useTeacherStore = defineStore('teachers', {
  state: (): { teachers: Teacher[] } => ({
    teachers: [],
  }),
  actions: {
    async fetchTeachers({ page = 1, filter = '' }: { page?: number; filter?: string } = {}) {
      try {
        const response = await TeacherApi.getAll({ page, filter })
        this.teachers = response?.data
        return response
      } catch (error) {
        console.log(error)
      }
    },
  },
  getters: {
    remaining: (state): Teacher[] => {
      return state.teachers
    },
  },
})
