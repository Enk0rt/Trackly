
type Props = {
    text:string,
    link:string,
    linkText:string
}

export const FormChanger = ({text,link,linkText}:Props) => {
    return (
        <div className='mt-1 flex gap-1 text-[12px]'>
            <p className='opacity-[.4] dark:text-[#FFFFFF]/76'>
                {text}
            </p>
            <a href={link} className='opacity-[.8] underline underline-offset-4 dark:text-[#FFFFFF]/90'>
                {linkText}
            </a>
        </div>
    );
};

