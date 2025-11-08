import { axiosClient } from '@/config/axios'
import { useAuthStore } from '@/stores/authStore'

interface UserCredentials {
  name?: string
  email?: string
  password?: string
  password_confirmation?: string
}

export const AuthApi = {
  login: async ({ credentials }: { credentials: UserCredentials }) => {
    console.log(credentials)
    const authStore = useAuthStore()
    try {
      const response = await axiosClient.post('/api/login', credentials)
      // console.log(response.data);
      authStore.saveCurrentUserInLocalStorage(response?.data?.user)
      authStore.saveCurrentTokenInLocalStorage(response?.data?.token)
      return response
    } catch (error) {
      console.log(error.response)
    }
  },
  register: async ({ credentials }: { credentials: UserCredentials }) => {
    try {
      const authStore = useAuthStore()
      const response = await axiosClient.post('/api/register', credentials)
      // console.log(response.data);
      authStore.saveCurrentUserInLocalStorage(response?.data?.user)
      authStore.saveCurrentTokenInLocalStorage(response?.data?.token)
      return response
    } catch (error) {
      console.log(error.response.data)
    }
  },
  logout: async () => {
    const authStore = useAuthStore()
    try {
      const response = await axiosClient.post('/api/logout', null, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      authStore.clearTokenFromLocalStorage()
      return response
    } catch (error) {
      console.log(error.response.data)
    }
  },
}
