export interface IEmailData {
    subject: string;
    template: string;
}

export type IEmailConstants<T extends Record<string, string>> = {
    [K in keyof T]: IEmailData;
};
