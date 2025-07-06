import { StatusCodeEnum } from "../enums/status-code.enum";

export class ApiError extends Error {
    status: number;

    constructor(status: StatusCodeEnum, message: string) {
        super(message);
        this.status = status;
    }
}
