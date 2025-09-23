export const blurEmail = (email: string): string => {
    const [name, domain] = email.split("@");
    const visible = 2

    return name.slice(0, visible).padEnd(name.length, "*") + "@" + domain;
};