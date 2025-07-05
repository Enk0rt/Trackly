export const delay = (duration: number): Promise<void> => {
    return new Promise((res) => {
        setTimeout(res, duration);
    });
};
