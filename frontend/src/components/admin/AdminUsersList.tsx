"use client";
import { IUser } from "@/interfaces/user/IUser";
import AdminUserItem from "@/components/admin/AdminUserItem";
import { useDeleteUser } from "@/hooks/mutations/useDeleteOneUser";
import { useDeleteUsers } from "@/hooks/mutations/useDeleteManyUsers";
import { AdminActions } from "@/components/admin/AdminActions";
import { useFetchUsers } from "@/hooks/admin/useFetchUsers";
import { useUserSelection } from "@/hooks/admin/useUserSelection";


type Props = {
    currentUsers: IUser[];
};

export const AdminUserList = ({ currentUsers }: Props) => {
    const { users } = useFetchUsers(currentUsers);
    const { chooseMode, selectedIds, toggleUserSelection, activateChooseMode, setSelectedIds } = useUserSelection();

    const { mutate: deleteUser } = useDeleteUser();
    const { mutate: deleteManyUsers } = useDeleteUsers();

    const handleDelete = () => {
        if (selectedIds.size === 1) {
            deleteUser(Array.from(selectedIds)[0]);
        } else {
            deleteManyUsers(Array.from(selectedIds));
        }
        setSelectedIds(new Set());
    };

    return (
        <>
            <AdminActions
                chooseMode={chooseMode}
                selectedCount={selectedIds.size}
                onDelete={handleDelete}
            />
            <div className="mt-3 flex flex-col gap-5">
                {users?.map((user) => (
                    <AdminUserItem
                        key={user._id}
                        user={user}
                        isChooseMode={chooseMode}
                        toggleUserSelection={toggleUserSelection}
                        isSelected={selectedIds.has(user._id)}
                        activateChooseMode={activateChooseMode}
                    />
                ))}
            </div>
        </>
    );
};