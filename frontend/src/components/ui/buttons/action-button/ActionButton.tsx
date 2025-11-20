import React, { ButtonHTMLAttributes, FC, memo } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg" | "round" | "noPadding";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    iconPosition?: "left" | "right";
    iconLabel?: string;
    variant?: Variant;
    iconSize?: string;
    size?: Size;
}

const ActionButton: FC<ActionButtonProps> = ({
                                                              icon: Icon,
                                                              iconPosition = "left",
                                                              iconLabel,
                                                              variant = "primary",
                                                              size = "md",
                                                              className = "",
                                                              children,
                                                              disabled,
                                                              iconSize = "w-5 h-5",
                                                              ...props
                                                          }) => {
    const sizeClasses: Record<Size, string> = {
        sm: "px-3 py-1 text-[16px] gap-1",
        md: "px-5 py-1 text-[18px] gap-2",
        lg: "px-7 py-1 text-[20px] gap-3",
        round: "px-3 py-3",
        noPadding: "",
    };

    const variantClasses: Record<Variant, string> = {
        primary: "bg-[#33674E] text-white border-none hover:bg-[#33674E] hover:text-white dark:bg-white dark:text-[#33674E] dark:hover:bg-[#33674E] dark:hover:text-white rounded-[14px]",
        secondary: "bg-white text-[#33674E] border border-[#33674E] hover:bg-[#33674E] hover:text-white dark:bg-[#33674E] dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-[#33674E] rounded-lg",
        ghost: "text-[#33674E] hover:bg-black/10 dark:text-white dark:hover:bg-white/10 border-none rounded-[14px]",
    };

    return (
        <button
            disabled={disabled}
            className={`flex items-center justify-center transition ease-[unset] duration-200 cursor-pointer  ${sizeClasses[size]} ${variantClasses[variant]} ${className} ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            {...props}
        >
            {Icon && iconPosition === "left" && (
                <Icon className={iconSize} aria-label={iconLabel} />
            )}

            {children && <span>{children}</span>}

            {Icon && iconPosition === "right" && (
                <Icon className={iconSize} aria-label={iconLabel} />
            )}
        </button>
    );
};

export default memo(ActionButton)