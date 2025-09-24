import { links } from "@/components/menu/data/links";
import { TypeBtnEnum } from "@/enums/typeBtnEnum";
import { MainBtn } from "@/components/ui/buttons/main-btn/MainBtn";

type Props = {
    pathname: string
}

export const MenuList = ({ pathname }: Props) => {
    return (
        <>
            {links.map((link) => (
                <li key={link.path}>
                    <MainBtn
                        type={TypeBtnEnum.LINK}
                        path={link.path}
                        className={`${
                            pathname === link.path
                                ? "bg-[#34684F] text-white dark:bg-white dark:text-[#34684F] shadow-[0_2px_4px_rgba(12,49,44,10)] dark:shadow-[0px_2px_4px_rgba(255,255,255,40)]"
                                : "hover:bg-[#34684F] hover:text-white text-[#34684F] dark:text-white dark:hover:bg-white dark:hover:text-[#34684F] hover:shadow-[0px_2px_4px_rgba(12,49,44,40)]  hover:dark:shadow-[0px_2px_4px_rgba(255,255,255,40)]"
                        }`}
                    >
                        {link.label}
                    </MainBtn>
                </li>
            ))}
        </>
    );
};

export default MenuList;