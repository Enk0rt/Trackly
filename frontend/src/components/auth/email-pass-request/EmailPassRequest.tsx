'use client'
import { PassRecoveryRequestEmailForm } from "@/components/auth/pass-recovery-email-form/PassRecoveryRequestEmailForm";

import { useState } from "react";
import Link from "next/link";
import { blurEmail } from "@/components/auth/email-pass-request/helpers/blurEmail";

export const EmailPassRequest = () => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    return (
        <>
            {
                !isSuccess ?
                    <div>
                        <h2 className='text-[22px]'>Forget your password?</h2>
                        <h3 className="mt-3">
                            To renew access to your account enter corresponding email.
                        </h3>
                        <PassRecoveryRequestEmailForm setIsSuccess={setIsSuccess} setEmail={setEmail}/>
                    </div>
                    :
                    <div>
                        <h2 className='text-[22px]'>Password recovery 🔑</h2>
                        <h3 className='mt-3'>
                            We’ve sent you a confirmation email. Please check {blurEmail(email)} inbox (and spam folder) and follow
                            further instructions.
                        </h3>
                        <p className='my-3'>Confirmation link will be unavailable in 3 minutes, chop-chop!</p>
                        <Link href='/'
                              className='w-fit mt-2 block text-[#33674E] dark:text-white underline underline-offset-2 transition duration-300 ease-in-out will-change-transform origin-center hover:scale-110'>To
                            home page</Link>
                    </div>
            }
        </>
    );
};

