import { defineStore } from 'pinia'

export const useSearchbarStore = defineStore('searchbar', {
  state: (): { filter: string } => ({
    filter: '',
  }),
  actions: {
    changeFilter(value: string) {
      this.filter = value
    },
  },
  getters: {
    getFilterWord: (state) => state.filter,
  },
})
