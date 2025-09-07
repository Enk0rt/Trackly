import { BackBtn } from "@/components/ui/back-btn/BackBtn";
import Logo from "@/components/ui/logo/Logo";
import { ThemeChanger } from "@/components/theme-changer/ThemeChanger";
import { RegisterForm } from "@/components/auth/register-form/RegisterForm";
import React from "react";


const Register = () => {
    return (
        <div className="mt-[34px] min-h-screen flex flex-col bg-[url(/cubes.png)] bg-no-repeat  bg-top">
            <header className=" w-[84%] max-w-[1249px] mx-auto">
                <div className="flex justify-between items-center">
                    <BackBtn />
                    <div className='flex gap-4 items-center'>
                        <ThemeChanger />
                        <Logo className={"hidden sm:flex"} />
                    </div>
                </div>
            </header>
            <main className="flex h-full justify-center">
                <RegisterForm />
            </main>
        </div>
    );
};

export default Register;