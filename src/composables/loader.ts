import { ref } from 'vue';

export const useLoader = () => {
    const isLoading = ref(false);

    const changeLoadingStatus = (status: boolean) => {
        isLoading.value = status;
    };
    return { isLoading, changeLoadingStatus };
};
