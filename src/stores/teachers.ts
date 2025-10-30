import { TeacherApi } from '@/data/apiService/teachers'
import type { Teacher } from '@/models/teacher'
import { defineStore } from 'pinia'

export const useTeacherStore = defineStore('teachers', {
  state: (): { teachers: Teacher[] } => ({
    teachers: [],
  }),
  actions: {
    async fetchTeachers(page: number = 1) {
      try {
        const response = await TeacherApi.getAll(page)
        this.teachers = response?.data
        return response
      } catch (error) {
        console.log(error)
      }
    },
    async filterTeachers(filter: string) {
      try {
        const response = await TeacherApi.filter(filter)
        console.log(response?.data)
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
