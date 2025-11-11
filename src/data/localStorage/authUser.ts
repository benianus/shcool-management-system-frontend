import type { User } from '@/models/user';

export function saveAuthUserInLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function getAuthUserFromLocalStorage(): User | null {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
}
