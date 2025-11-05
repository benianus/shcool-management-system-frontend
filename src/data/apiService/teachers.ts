import { axiosClient } from '@/config/axios'
import { getCSRF } from '../global'

export const TeacherApi = {
  getAll: async ({
    page = 1,
    limit = 9,
    filter = '',
  }: {
    page?: number
    limit?: number
    filter?: string
  } = {}) => {
    try {
      const response = await axiosClient.get(
        `/api/teachers?page=${page}&limit=${limit}&name=${filter}`,
      )
      return response
    } catch (error) {
      console.log(error)
    }
  },
  show: async ({ id }: { id?: string | string[] } = {}) => {
    try {
      const response = await axiosClient.get(`/api/teachers/${id}`)
      // console.log(response)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  create: async (values: { name: string; email: string; user: string }) => {
    try {
      await getCSRF()
      const response = await axiosClient.post('/api/teachers', values)
      // console.log(response)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  update: async ({
    id,
    values,
  }: {
    id?: string | string[]
    values?: { name?: string; email?: string; course?: string }
  } = {}) => {
    try {
      await getCSRF()
      const response = await axiosClient.put(`/api/teachers/${id}`, values)
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  delete: async ({ id }: { id?: string | string[] }) => {
    try {
      await getCSRF()
      const response = await axiosClient.delete(`/api/teachers/${id}`)
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
    }
  },
}
