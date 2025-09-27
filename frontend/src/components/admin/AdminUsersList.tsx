"use client";
import { IUser } from "@/interfaces/user/IUser";
import React, { useCallback, useEffect, useState } from "react";
import AdminUserItem from "@/components/admin/AdminUserItem";
import { ActionButton } from "@/components/ui/buttons/action-button/ActionButton";
import UserBlockIcon from "@/components/ui/svg/user/UserBlockIcon";
import UserVerifyIcon from "@/components/ui/svg/user/UserVerifyIcon";
import Delete from "@/components/ui/svg/buttons/Delete";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
    users: IUser[];
};

export const AdminUsersList = ({ users }: Props) => {
    const [chooseMode, setChooseMode] = useState(false);
    const [isChosen, setIsChosen] = useState<IUser[]>([]);

    const toggleUserSelection = useCallback(
        (user: IUser) => {
            setIsChosen(prev =>
                prev.some(u => u._id === user._id)
                    ? prev.filter(u => u._id !== user._id)
                    : [...prev, user]
            );
        },
        []
    );

    const activateChooseModeWith = (user: IUser) => {
        setChooseMode(true);
        setIsChosen([user]);
    };

    useEffect(() => {
        if (isChosen.length === 0) {
           setTimeout(() => {
               setChooseMode(false)
           },300)
        }

        }, [isChosen.length]);

    return (
        <>
            <div className={`flex items-center justify-between`}>

                <AnimatePresence>
                    {
                        chooseMode ?
                        <motion.p
                            key="overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 100 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}>
                            Total selected items : {isChosen.length}
                        </motion.p>
                        : <div></div>
                    }
                </AnimatePresence>
                <div className="flex gap-2 justify-end">
                    <ActionButton icon={UserBlockIcon} iconLabel={"Block user"} iconSize={"w-[26px] h-[26px]"}
                                  variant="ghost" size="round" disabled={false}
                                  className="rounded-full hover:!bg-black/10" />

                    <ActionButton icon={UserVerifyIcon} iconLabel={"Verify user"} iconSize={"w-[26px] h-[26px]"}
                                  variant="ghost" size="round" disabled={false}
                                  className="rounded-full hover:!bg-black/10" />

                    <ActionButton icon={Delete} iconLabel={"Delete user"} iconSize={"w-[26px] h-[26px]"} variant="ghost"
                                  size="round" disabled={false} className="rounded-full hover:!bg-black/10" />
                </div>
            </div>
            <div className="mt-3 flex flex-col gap-5">
                {users?.map((user) => (
                    <AdminUserItem
                        key={user._id}
                        user={user}
                        isChooseMode={chooseMode}
                        toggleUserSelection={toggleUserSelection}
                        isChosen={isChosen}
                        activateChooseModeWith={activateChooseModeWith}
                    />
                ))}
            </div>
        </>
    )
        ;
};

export default AdminUsersList;
