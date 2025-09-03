
import Image from "next/image";

type Props = {
    action: () => object;
}

export const Logout = ({action}:Props) => {
    return (
        <button onClick={action} className='cursor-pointer'>
           <Image src={'/svg/logout-icon.svg'} alt={'Logout icon'} width={60} height={60}/>
        </button>
    );
};

