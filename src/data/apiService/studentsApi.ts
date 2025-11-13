import { axiosClient } from '@/config/axios';
import { useAuthStore } from '@/stores/authStore';

export const StudentApi = {
    get: async ({
        page = 1,
        perPage = 9,
        search = '',
    }: { page?: number; perPage?: number; search?: string } = {}) => {
        try {
            const response = await axiosClient.get(
                `/api/students?page=${page}&per_page=${perPage}&search=${search}`
            );
            return response;
        } catch (error) {
            console.log(error.response.data.message);
        }
    },
    show: async ({ id }: { id?: string | string[] }) => {
        try {
            const response = await axiosClient.get(`/api/students/${id}`);
            return response;
        } catch (error) {
            console.log(error.response.data.message);
        }
    },
    store: async ({
        values,
    }: {
        values?: { name?: string; email?: string; birthdate?: string; user_id?: number };
    } = {}) => {
        try {
            const authStore = useAuthStore();
            const response = await axiosClient.post('/api/students', values, {
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                },
            });
            return response;
        } catch (error) {
            console.log(error.response);
        }
    },
    update: async ({
        id,
        values,
    }: {
        id?: string | string[];
        values?: { name?: string; email?: string; birthdate?: string };
    } = {}) => {
        try {
            const authStore = useAuthStore();
            const response = await axiosClient.put(`/api/students/${id}`, values, {
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                },
            });
            return response;
        } catch (error) {
            console.log(error.response.data.message);
        }
    },
    delete: async ({ id }: { id?: string | string[] }) => {
        try {
            const authStore = useAuthStore();
            const response = await axiosClient.delete(`/api/students/${id}`, {
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                },
            });
            return response;
        } catch (error) {
            console.log(error.response.data.message);
        }
    },
};
