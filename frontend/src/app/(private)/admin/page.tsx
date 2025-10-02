import React from "react";
import { getDataFromServer } from "@/services/api/getDataFromServer";
import { AdminUserList } from "@/components/admin/AdminUsersList";
import { RoleEnum } from "@/enums/roleEnum";
import { redirect } from "next/navigation";

const AdminPage = async () => {
    const [data, currentUser] = await Promise.all([
        await getDataFromServer.getUsersWithParams(1,3),
        await getDataFromServer.getMe(),
    ]);

    if (currentUser?.role !== RoleEnum.ADMIN) {
        redirect("/");
    }
    return (
        <div className="mt-10 flex justify-center">
            <div className="relative w-[84%] max-w-[1249px]">

                {
                    data?.data ? <AdminUserList currentUsers={data} /> : <h3> Users not found</h3>
                }
            </div>
        </div>
    );
};

export default AdminPage;