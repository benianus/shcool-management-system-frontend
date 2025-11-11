import { defineStore } from 'pinia';

export const usePaginationStore = defineStore('pagination', {
    state: () => ({
        page: 1,
        disableNextBtn: false,
        disablePrevBtn: true,
    }),
    actions: {
        returnToPrevPage() {
            this.disableNextBtn = false;
            this.page--;
        },
        goToNextPage() {
            this.disablePrevBtn = false;
            this.page++;
        },
    },
    getters: {},
});
