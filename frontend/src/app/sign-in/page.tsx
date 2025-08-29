import { BackBtn } from "@/components/ui/back-btn/BackBtn";
import Logo from "@/components/ui/logo/Logo";
import LoginForm from "@/components/login-form/LoginForm";
import { ThemeChanger } from "@/components/theme-changer/ThemeChanger";


const Login = () => {
    return (
        <div className="mt-[34px] h-[100vh] pb-40 bg-[url(/cubes.png)] bg-no-repeat  bg-top">
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
                <LoginForm />
            </main>
        </div>
    );
};

export default Login;