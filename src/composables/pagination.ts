import type { StoreType } from '@/enums/storeType'
import { useTeacherStore } from '@/stores/teachers'
import { ref } from 'vue'

export const usePagination = (store: StoreType) => {
  const teachersStore = useTeacherStore()
  const page = ref(1)
  const disablePrevBtn = ref(true)
  const disableNextBtn = ref(false)

  async function returnToPrevPage() {
    page.value--
    if (page.value <= 1) {
      disablePrevBtn.value = true
      return
    }

    await teachersStore.fetchTeachers(page.value)
  }

  async function goToNextPage() {
    disablePrevBtn.value = false
    page.value++
    await teachersStore.fetchTeachers(page.value)
  }

  return { page, disableNextBtn, disablePrevBtn, returnToPrevPage, goToNextPage }
}
