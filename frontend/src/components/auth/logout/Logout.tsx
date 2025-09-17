
import LogoutIcon from "@/components/ui/svg/buttons/LogoutIcon";

type Props = {
    action: () => object;
}

export const Logout = ({action}:Props) => {
    return (
        <button onClick={action} className='cursor-pointer'>
            <LogoutIcon className='w-[60px] h-[60px] text-[#33674E] dark:text-white'/>
        </button>
    );
};

