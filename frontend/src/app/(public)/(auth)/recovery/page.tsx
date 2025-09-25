import Logo from "@/components/ui/logo/Logo";
import { ThemeChanger } from "@/components/theme-changer/ThemeChanger";
import { EmailPassRequest } from "@/components/auth/email-pass-request/EmailPassRequest";

const PassRecoveryRequestPage = async () => {
    return (
        <div className="mt-[34px] h-[100vh] pb-40 bg-[url(/cubes.png)] bg-no-repeat  bg-top relative">
            <header className=" w-[84%] max-w-[1249px] mx-auto">
                <div className="flex justify-end items-center">
                    <div className="flex gap-4 items-center">
                        <ThemeChanger />
                        <Logo className={"hidden sm:flex"} />
                    </div>
                </div>
            </header>
            <main className="flex justify-center items-center h-[70vh] my-auto">
                    <div
                        className="px-[30px] py-[24px] max-w-[400px] text-[#33674E] dark:text-white shadow-[0_3px_8px_rgba(52,104,79,10)] dark:shadow-[0px_2px_6px_rgba(255,255,255,40)] rounded-[14px] backdrop-blur-[10px]">
                        <EmailPassRequest/>
                    </div>
            </main>
        </div>
    );
};

export default PassRecoveryRequestPage;