import { useState } from "react";

export const useSetParams = (initialQuery: {
    page: number,
    pageSize: number,
    search: string | undefined,
    sort: string | undefined,
    sortDirection: "desc" | "asc" | 1 | -1
}) => {

    const [page, setPage] = useState<number>(initialQuery.page);
    const [pageSize, setPageSize] = useState<number>(initialQuery.pageSize);
    const [searchValue, setSearchValue] = useState<string | undefined>(initialQuery.search);
    const [sortValue, setSortValue] = useState<string | undefined>(initialQuery.sort);


    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("pageSize", String(pageSize));
    if (initialQuery.search) {
        params.set("search", initialQuery.search);
    }
    if (initialQuery.sort) params.set("sort", initialQuery.sort);

    return { params, page, setPage, pageSize, setPageSize,searchValue,setSearchValue,sortValue,setSortValue };
};