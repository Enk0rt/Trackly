"use client";
import { PassRecoveryEmailForm } from "@/components/auth/pass-recovery-email-form/PassRecoveryEmailForm";
import Link from "next/link";
import {useState } from "react";

type Props = {
    token: string
}

export const EmailPassChange = ({ token }: Props) => {

    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    return (
        <>
            {
                !isSuccess ? <div>
                        <h2 className="text-[22px]">Password change 🔑</h2>
                        <h3 className="mt-3 ">
                            Great! Now you can set up new password
                        </h3>
                        <PassRecoveryEmailForm token={token} setIsSuccess={setIsSuccess} />
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
                                    className="w-fit mt-2 block text-[#33674E] dark:text-white underline underline-offset-2 transition duration-300 ease-in-out will-change-transform origin-center hover:scale-110">To
                                  home page
                              </Link>
                              <Link href="/sign-in"
                                    className="w-fit mt-2 block text-[#33674E] dark:text-white underline underline-offset-2 transition duration-300 ease-in-out will-change-transform origin-center hover:scale-110">
                                  Sign in
                              </Link>
                          </div>
                        </div>
            }
        </>
    )
};

