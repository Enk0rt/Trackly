import Link from "next/link";

type Props = {
    text:string,
    link:string,
    linkText:string
}

export const FormChangerLink = ({text,link,linkText}:Props) => {
    return (
        <div className='mt-1 flex gap-1 text-[12px]'>
            <p className='opacity-[.4] dark:text-[#FFFFFF]/76 text-[#34684F]'>
                {text}
            </p>
            <Link href={link} className='opacity-[.8] hover:underline underline-offset-4 dark:text-[#FFFFFF]/90 text-[#34684F]'>
                {linkText}
            </Link>
        </div>
    );
};

