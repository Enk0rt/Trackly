export const retrieveLocalStorage = <T>(key: string) => {
    const obj = localStorage.getItem(key);

    if (!obj) {
        return null
    }

    const parse = JSON.parse(obj);
    return parse as T;
};
