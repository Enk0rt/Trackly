import { FC } from "react";
import { IUsersResponseWithParams } from "@/interfaces/user/IUserResponse";
import AdminUserList from "@/components/admin/AdminUsersList";

type Props = {
    data: IUsersResponseWithParams;
    initialQuery: {
        page: number,
        pageSize: number,
        search: string | undefined,
        sort: string | undefined,
        sortDirection: "desc" | "asc" | 1 | -1
    }
};

export const AdminPanel: FC<Props> = ({ data, initialQuery }) => {
    return (
        <div className="mt-10 flex justify-center">
            <AdminUserList currentUsers={data} initialQuery={initialQuery} />
        </div>
    );
};