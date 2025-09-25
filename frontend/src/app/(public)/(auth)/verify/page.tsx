import Logo from "@/components/ui/logo/Logo";
import { ThemeChanger } from "@/components/theme-changer/ThemeChanger";
import Link from "next/link";
import { BackBtn } from "@/components/ui/buttons/back-btn/BackBtn";



const Verify = async () => {
    return (
        <div className="mt-[34px] h-[100vh] pb-40 bg-[url(/cubes.png)] bg-no-repeat  bg-top relative">
            <header className=" w-[84%] max-w-[1249px] mx-auto">
                <div className="flex justify-between items-center">
                    <BackBtn />
                    <div className='flex gap-4 items-center'>
                        <ThemeChanger />
                        <Logo className={"hidden sm:flex"} />
                    </div>
                </div>
            </header>
            <main className="flex justify-center items-center h-[70vh] my-auto">
                <div className='px-[30px] py-[24px] max-w-[400px] text-[#33674E] dark:text-white shadow-[0_3px_8px_rgba(52,104,79,10)] dark:shadow-[0px_2px_6px_rgba(255,255,255,40)] rounded-[14px] backdrop-blur-[10px]'>
                    <h2 className='text-[22px]'>Email verification 📬</h2>
                    <h3 className='mt-3'>
                        We’ve sent you a confirmation email. Please check your inbox (and spam folder) to verify your
                        email address and activate your account.
                    </h3>
                    <p className='my-3'>Confirmation link will be unavailable for 5 minutes, chop-chop!</p>
                    <Link href='/'
                          className='w-fit mt-2 block text-[#33674E] dark:text-white underline underline-offset-2 transition duration-300 ease-in-out opacity-50 hover:opacity-100'>To home page</Link>
                </div>
            </main>
        </div>
    );
};

export default Verify;