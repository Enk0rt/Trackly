type Props = {
    text: string
    className?: string
}

export const MainBtn = ({text,className}:Props) => {
    return (
            <button
                className={` py-[4px] px-[24px] rounded-[50px] outline-0 border-[0] text-[#0C312C] font-[inherit] text-[10px] sm:text-xl  cursor-pointer transition duration-300 ease-in-out ${className}`}>
                {text}
            </button>
    );
};

