import { axiosClient } from '@/config/axios';
import { getCSRF } from '../global';
import { useAuthStore } from '@/stores/authStore';

export const TeacherApi = {
    getAll: async ({
        page = 1,
        limit = 9,
        filter = '',
    }: {
        page?: number;
        limit?: number;
        filter?: string;
    } = {}) => {
        try {
            const response = await axiosClient.get(
                `/api/teachers?page=${page}&limit=${limit}&name=${filter}`
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    show: async ({ id }: { id?: string | string[] } = {}) => {
        try {
            const response = await axiosClient.get(`/api/teachers/${id}`);
            // console.log(response)
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    create: async (values: { name?: string; email?: string; course?: string; user?: string }) => {
        try {
            const authStore = useAuthStore();
            const response = await axiosClient.post('/api/teachers', values, {
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                },
            });
            return response;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    update: async ({
        id,
        values,
    }: {
        id?: string | string[];
        values?: { name?: string; email?: string; course?: string };
    } = {}) => {
        try {
            // await getCSRF()
            const authStore = useAuthStore();
            const response = await axiosClient.put(`/api/teachers/${id}`, values, {
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                },
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error.response.data.message);
        }
    },
    delete: async ({ id }: { id?: string | string[] }) => {
        try {
            // await getCSRF()
            const authStore = useAuthStore();
            const response = await axiosClient.delete(`/api/teachers/${id}`, {
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                },
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};
