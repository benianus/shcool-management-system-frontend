import { axiosClient } from '@/config/axios';

export const ClassesApi = {
    index: async ({ search = '' }: { search?: string } = {}) => {
        try {
            const response = await axiosClient.get(`/api/courses?search=${search}`);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    show: async () => {},
    store: async () => {},
    update: async () => {},
    delete: async () => {},
};
