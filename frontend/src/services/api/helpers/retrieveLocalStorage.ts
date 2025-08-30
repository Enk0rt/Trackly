export const retrieveLocalStorage = <T>(key: string) => {
    const obj = localStorage.getItem(key) || "";

    if (!obj) {
        return {} as T;
    }

    const parse = JSON.parse(obj);
    return parse as T;
};
