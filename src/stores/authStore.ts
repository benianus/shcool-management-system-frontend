import {
    getAuthUserFromLocalStorage,
    saveAuthUserInLocalStorage,
} from '@/data/localStorage/authUser';
import { getTokenFromLocalStorage, saveTokenInLocalStorage } from '@/data/localStorage/token';
import { removeItemFromLocalStorage } from '@/helpers';
import type { User } from '@/models/user';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: (): { user: User | null; token: string | null; isAuthenticated: boolean } => ({
        user: getAuthUserFromLocalStorage(),
        token: getTokenFromLocalStorage(),
        isAuthenticated: getTokenFromLocalStorage() !== null ? true : false,
    }),
    actions: {
        saveCurrentUserInLocalStorage(user: User) {
            this.user = user;
            saveAuthUserInLocalStorage(user);
        },
        saveCurrentTokenInLocalStorage(token: string) {
            this.token = token;
            saveTokenInLocalStorage(token);
        },
        clearTokenFromLocalStorage() {
            removeItemFromLocalStorage('user');
            removeItemFromLocalStorage('token');
            this.user = null;
            this.token = null;
        },
    },
    getters: {
        remainingIsAuthenticated(): boolean {
            return (this.isAuthenticated = this.user !== null && this.token !== null);
        },
    },
});
