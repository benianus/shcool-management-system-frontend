import { ClassesApi } from '@/data/apiService/classesApi'
import type { Course } from '@/models/class'
import { defineStore } from 'pinia'

export const useClassesStore = defineStore('classes', {
  state: (): { classes: Course[] } => ({
    classes: [],
  }),
  actions: {
    async fetchClasses() {
      try {
        const response = await ClassesApi.getAll()
        this.classes = response?.data
      } catch (error) {
        console.log(error)
      } finally {
      }
    },
  },
  getters: {
    remainingClasses: (state): Course[] => {
      return state.classes
    },
  },
})
