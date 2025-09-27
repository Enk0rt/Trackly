import React from "react";
import { getData } from "@/services/api/getData";
import AdminUsersList from "@/components/admin/AdminUsersList";

const AdminPage = async () => {
    const users = await getData.getUsers();
    return (
        <div className="mt-10 flex justify-center">
            <div className="w-[84%] max-w-[1249px]">

                {
                    users ? <AdminUsersList users={users} /> : <h3> Users not found</h3>
                }
            </div>
        </div>
    );
};

export default AdminPage;