import { axiosClient } from '@/config/axios'

export const TeacherApi = {
  getAll: async (page: number = 1, limit: number = 9) => {
    try {
      const response = await axiosClient.get(`/api/teachers?page=${page}&limit=${limit}`)
      // console.log(response.status)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  filter: async (filter: string = '', page: number = 1, limit: number = 9) => {
    try {
      const response = await axiosClient.get(
        `/api/teachers/filter?page=${page}&limit=${limit}&name=${filter}`,
      )
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  show: async () => {},
  create: async () => {},
  update: async () => {},
  delete: async () => {},
}
