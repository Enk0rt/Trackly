import Logo from "@/components/ui/logo/Logo";
import { ThemeChanger } from "@/components/theme-changer/ThemeChanger";
import { verifyPasswordRecoveryToken } from "@/services/api/auth";
import Link from "next/link";
import { EmailPassChange } from "@/components/email-pass-change/EmailPassChange";

type Props = {
    params: { token: string }
}

const PassConfirmPage = async ({ params }: Props) => {
    const { token } = await params;
    const isTokenValid = await verifyPasswordRecoveryToken(token);

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
                {

                    <div
                        className="px-[30px] py-[24px] max-w-[400px] text-[#33674E] dark:text-white shadow-[0_3px_8px_rgba(52,104,79,10)] dark:shadow-[0px_2px_6px_rgba(255,255,255,40)] rounded-[14px]">
                        {
                            isTokenValid ?
                                <EmailPassChange token={token} />
                                :
                                <div>
                                    <h2 className="text-[22px]">Error 😥</h2>
                                    <h3 className="mt-3">
                                        Looks like password recovery link expired. Try again or come back home
                                    </h3>
                                   <div className='mt-2 flex gap-5 items-center'>
                                       <Link href={'/recovery'}
                                             className="w-fit block text-[#33674E] dark:text-white opacity-60 hover:opacity-100 underline underline-offset-2 transition duration-300 ease-in-out ">
                                           Try again
                                       </Link>
                                       <Link href="/"
                                             className="w-fit block text-[#33674E] dark:text-white opacity-60 hover:opacity-100 underline underline-offset-2 transition duration-300 ease-in-out ">
                                           To home page
                                       </Link>
                                   </div>
                                </div>
                        }
                    </div>
                }
            </main>
        </div>
    );
};

export default PassConfirmPage;