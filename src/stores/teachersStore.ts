import { TeacherApi } from '@/data/apiService/teachersApi'
import type { Teacher } from '@/models/teacher'
import { defineStore } from 'pinia'

export const useTeacherStore = defineStore('teachers', {
  state: (): { teachers: Teacher[]; teacher: Teacher } => ({
    teachers: [],
    teacher: {},
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
    async showTeacher({ id }: { id?: string | string[] }) {
      try {
        const response = await TeacherApi.show({ id: id })
        console.log(response?.data)
        this.teacher = response?.data
        return response
      } catch (error) {
        console.log(error)
      }
    },
  },
  getters: {
    remainingTeachers: (state): Teacher[] => {
      return state.teachers
    },
    remainingTeacher: (state): Teacher => {
      return state.teacher
    },
  },
})
