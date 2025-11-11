export function clearLocalStorage() {
    localStorage.clear();
}

export function removeItemFromLocalStorage(key: string) {
    localStorage.removeItem(key);
}

export function setItemInLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
}

export function getItemFromLocalStorage(key: string) {
    return localStorage.getItem(key);
}
