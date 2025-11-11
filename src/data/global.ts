import { axiosClient } from '@/config/axios';

export const getCSRF = async () => {
    try {
        await axiosClient.get('/sanctum/csrf-cookie');
    } catch (error) {
        console.log(error);
    }
};
