import { StatusCodeEnum } from "../enums/status-code.enum";

export class ApiError extends Error {
    status: number;
    field?: string;

    constructor(status: StatusCodeEnum, message: string, field?: string) {
        super(message);
        this.status = status;
        this.field = field;
    }
}
