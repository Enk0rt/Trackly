import Logo from "@/components/ui/logo/Logo";
import { ThemeChanger } from "@/components/theme-changer/ThemeChanger";
import { verifyEmail } from "@/services/api/auth";
import Link from "next/link";

type Props = {
    params: { token: string }
}

const Confirm = async ({ params }: Props) => {
    const { token } = await params;
    const user = await verifyEmail(token);

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

                        <div className="px-[30px] py-[24px] max-w-[400px] text-[#33674E] dark:text-white shadow-[0_3px_8px_rgba(52,104,79,10)] dark:shadow-[0px_2px_6px_rgba(255,255,255,40)] rounded-[14px]">
                            {
                                user ?
                                    <div>
                                        <h2>Success 🎉</h2>
                                        <h3 className='mt-3'>
                                            Great! Your email is confirmed. Welcome aboard!
                                        </h3>
                                        <Link href='/sign-in'
                                              className='w-fit mt-2 block text-[#33674E] dark:text-white underline underline-offset-2 transition duration-300 ease-in-out will-change-transform origin-center hover:scale-110'>Sign
                                            in</Link>
                                    </div> :
                                    <div>
                                        <h2>Error 😥</h2>
                                        <h3 className='mt-3'>
                                            Something went wrong :(
                                        </h3>
                                        <Link href='/'
                                              className='w-fit mt-2 block text-[#33674E] dark:text-white underline underline-offset-2 transition duration-300 ease-in-out will-change-transform origin-center hover:scale-110'>To home page</Link>
                                    </div>
                            }
                        </div>
                }
            </main>
        </div>
    );
};

export default Confirm;