import { axiosClient } from '@/config/axios'

export const ClassesApi = {
  getAll: async () => {
    try {
      const response = await axiosClient.get('/api/courses')
      // console.log(response.data)
      return response;
    } catch (error) {
      console.log(error)
    }
  },
}
