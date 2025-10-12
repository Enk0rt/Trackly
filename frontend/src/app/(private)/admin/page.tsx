import React from "react";
import { getDataFromServer } from "@/services/api/getDataFromServer";
import { AdminPanel } from "@/components/admin/AdminPanel";

const AdminPage = async () => {
     const data =  await getDataFromServer.getUsersWithParams(1,3)

    return (
        <div>
            <AdminPanel data={data} />
        </div>
    );
};

export default AdminPage;