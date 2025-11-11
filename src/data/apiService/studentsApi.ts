import { axiosClient } from '@/config/axios';

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
            console.log(response.data);
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
    store: async () => {},
    update: async ({
        id,
        values,
    }: {
        id?: string | string[];
        values?: { name?: string; email?: string; birthdate?: string };
    } = {}) => {
        try {
            const response = await axiosClient.put(`/api/students/${id}`, values);
            return response;
        } catch (error) {
            console.log(error.response.data.message);
        }
    },
    delete: async ({ id }: { id?: string | string[] }) => {
        try {
            const response = await axiosClient.delete(`/api/students/${id}`);
            return response;
        } catch (error) {
            console.log(error.response.data.message);
        }
    },
};
