export interface IApiSuccessResponse<T> {
    data: T;
    details?: string;
    pageSize?: number;
    page?: number;
    total?: number;
    totalPages?: number;
}
