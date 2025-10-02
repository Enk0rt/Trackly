type Props = {
    label: string,
    value: string | number

}

export const AdminUserInfoField = ({ label, value }: Props) => {
    return (
        <div>
            <h3 className="text-[18px]">{label}</h3>
            <p className="opacity-50">{value}</p>
        </div>
    );
};

export default AdminUserInfoField;