"use client";
import { PassRecoveryEmailForm } from "@/components/auth/pass-recovery-email-form/PassRecoveryEmailForm";
import Link from "next/link";
import { useState } from "react";
import { Timer } from "@/components/timer/Timer";

type Props = {
    token: string,
}

export const EmailPassChange = ({ token }: Props) => {

    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isTimeRunOut, setIsTimeRunOut] = useState<boolean>(false);

    return (
        <>
            {
                !isSuccess ? <div>
                        <div className='flex justify-between items-center'>
                            <h2 className="text-[22px]">Password change 🔑</h2>
                            {
                                !isTimeRunOut ? <Timer initialMinutesValue={2} initialSecondsValue={0} setIsTimeRunOut={setIsTimeRunOut} />
                                    :
                                    <Link href={'/recovery'}
                                          className="w-fit mt-2 block text-[#33674E] dark:text-white sm:text-[14px] opacity-60 hover:opacity-100 underline underline-offset-2 transition duration-300 ease-in-out will-change-transform origin-center">
                                        Get new link
                                    </Link>
                            }
                        </div>
                        <h3 className="mt-3 ">
                            {!isTimeRunOut ? "Great! Now you can set up new password" : "Whoops.. Seems like time has run out. Try to get new link again or come back to home page"}
                        </h3>
                        <PassRecoveryEmailForm token={token} setIsSuccess={setIsSuccess} isTimeRunOut={isTimeRunOut}/>
                    </div>
                    :
                        <div>
                            <h2>Success 🎉</h2>
                            <h3 className="mt-3">
                                Your password is changed. Write down it somewhere not to forget ☺️!
                            </h3>
                            <p className="mt-2">Have a nice day</p>
                          <div className='flex gap-5 items-center'>
                              <Link href="/"
                                    className="w-fit mt-2 block text-[#33674E] dark:text-white underline underline-offset-2 transition duration-300 ease-in-out opacity-60 hover:opacity-100">To
                                  home page
                              </Link>
                              <Link href="/sign-in"
                                    className="w-fit mt-2 block text-[#33674E] dark:text-white underline underline-offset-2 transition duration-300 ease-in-out opacity-60 hover:opacity-100">
                                  Sign in
                              </Link>
                          </div>
                        </div>
            }
        </>
    )
};

