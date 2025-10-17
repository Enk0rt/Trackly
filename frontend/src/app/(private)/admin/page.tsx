import { getDataFromServer } from "@/services/api/getDataFromServer";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { SortEnum } from "@/enums/sortEnum";

type Props = {
    searchParams: Promise<{
        page: string,
        pageSize: string,
        search: string,
        sort: string,
        sortDirection: "desc" | "asc" | 1 | -1
    }>
}
export default async function AdminPage({ searchParams }: Props,
) {
    const params = await searchParams;
    const page = Number(params?.page || 1);
    const pageSize = Number(params?.pageSize || 3);
    const search = params?.search || undefined;

    const validSortValues = Object.values(SortEnum);
    const sort = validSortValues.includes(params?.sort as SortEnum)
        ? (params?.sort as SortEnum)
        : undefined;

    const sortDirection = params?.sortDirection || 1;
    const data = await getDataFromServer.getUsersWithParams(
        page,
        pageSize, search, sort, sortDirection,
    );

    return (
        <div>
            <AdminPanel
                data={data}
                initialQuery={{ page, pageSize, search, sort, sortDirection }}
            />
        </div>
    );
}