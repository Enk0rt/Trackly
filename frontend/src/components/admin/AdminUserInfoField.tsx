import { FC, memo } from "react";

type Props = {
    label: string,
    value: string | number

}

const AdminUserInfoField:FC<Props> = ({ label, value }) => {
    return (
        <div>
            <h3 className="text-[18px]">{label}</h3>
            <p className="opacity-50">{value}</p>
        </div>
    );
};

export default memo(AdminUserInfoField);