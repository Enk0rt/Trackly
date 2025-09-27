import { links } from "@/components/menu/data/links";
import MenuItem from "@/components/menu/MenuItem";
import { IUser } from "@/interfaces/user/IUser";
import { RoleEnum } from "@/enums/roleEnum";

type Props = {
    user: IUser
    pathname: string
}

export const MenuList = ({ user, pathname }: Props) => {
    return (
        <>
            {
                user?.role === RoleEnum.USER ?
                    <>
                        {links.user.map((link) => (
                            <MenuItem key={link.path} link={link} pathname={pathname} />
                        ))}
                    </> :

                    <>
                        {
                            links.admin.map((link) => (
                                <MenuItem key={link.path} link={link} pathname={pathname} />
                            ))
                        }
                    </>
            }
        </>
    );
};

export default MenuList;