import { BackBtn } from "@/components/ui/back-btn/BackBtn";
import Logo from "@/components/ui/logo/Logo";
import { ThemeChanger } from "@/components/theme-changer/ThemeChanger";



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
                <h3 className='px-[30px] py-[24px] max-w-[400px] text-[#33674E] dark:text-white border border-white rounded-[14px]'>
                    We’ve sent you a confirmation email. Please check your inbox (and spam folder) to verify your email address and activate your account.
                </h3>
            </main>
        </div>
    );
};

export default Verify;