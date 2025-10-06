import React from "react";
import AdminUserInfoField from "@/components/admin/AdminUserInfoField";

type InfoItem = { label: string; value: string | number };
type Props = { items: InfoItem[] };

export const UserInfoGroup: React.FC<Props> = ({ items }) => (
    <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between lg:items-center md:w-[35%] gap-3 md:gap-4">
        {items.map(({ label, value }) => (
            <AdminUserInfoField key={label} label={label} value={value} />
        ))}
    </div>
);
