import React, { FC, ReactElement } from "react";

type Props = {
    label: string;
    icon: ReactElement;
    disabled?: boolean;
    onClick: () => void;
};

export const RoleChangeButton: FC<Props> = ({ label, icon, disabled, onClick }) => (
    <button
        disabled={disabled}
        onClick={(e) => {
            e.stopPropagation();
            onClick();
        }}
        className={`w-[30%] p-3 flex flex-col items-center justify-center rounded-[12px] transition cursor-pointer ${
            disabled
                ? "opacity-50 !cursor-not-allowed"
                : "hover:scale-[1.05] hover:bg-[#33674E] hover:text-white dark:hover:bg-white dark:hover:text-[#33674E]"
        }`}
    >
        <div className="p-3 border rounded-full mb-2">{icon}</div>
        <p>{label}</p>
    </button>
);
