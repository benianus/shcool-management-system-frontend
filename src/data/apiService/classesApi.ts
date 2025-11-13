import { axiosClient } from '@/config/axios';

export const ClassesApi = {
    index: async ({
        page = 1,
        perPage = 9,
        search = '',
    }: { page?: number; perPage?: number; search?: string } = {}) => {
        try {
            const response = await axiosClient.get(
                `/api/courses?page=${page}&per_page=${perPage}&search=${search}`
            );
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
