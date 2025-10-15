import { FC } from "react";
import { IUsersResponseWithParams } from "@/interfaces/user/IUserResponse";
import AdminUserList from "@/components/admin/AdminUsersList";

type Props = {
    data: IUsersResponseWithParams
}

export const AdminPanel: FC<Props> = ({ data }) => {


    return (
        <div className="mt-10 flex justify-center">
            <AdminUserList currentUsers={data} />
        </div>
    );
};

