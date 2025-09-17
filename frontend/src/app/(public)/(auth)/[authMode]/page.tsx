import { BackBtn } from "@/components/ui/back-btn/BackBtn";
import Logo from "@/components/ui/logo/Logo";
import { ThemeChanger } from "@/components/theme-changer/ThemeChanger";
import LoginForm from "@/components/auth/login-form/LoginForm";
import { RegisterForm } from "@/components/auth/register-form/RegisterForm";

type Props={
    params: {authMode:string}
}

const Auth = async ({params}:Props) => {
    const {authMode} = await params
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
            <main className="flex">
                {
                    authMode === "sign-in" ?  <LoginForm /> : <RegisterForm/>
                }
            </main>
        </div>
    );
};

export default Auth;