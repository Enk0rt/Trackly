import Logo from "@/components/ui/logo/Logo";
import { ThemeChanger } from "@/components/theme-changer/ThemeChanger";
import LoginForm from "@/components/auth/login-form/LoginForm";
import { BackBtn } from "@/components/ui/buttons/back-btn/BackBtn";


const SignUpPage = async () => {

    return (
        <div className="mt-[34px] h-[100vh] pb-40 bg-[url(/cubes.png)] bg-no-repeat  bg-top relative">
            <nav className=" w-[84%] max-w-[1249px] mx-auto">
                <div className="flex justify-between items-center">
                    <BackBtn />
                    <div className="flex gap-4 items-center">
                        <ThemeChanger />
                        <Logo className={"hidden sm:flex"} />
                    </div>
                </div>
            </nav>
            <div className="flex">
                <LoginForm />
            </div>
        </div>
    );
};

export default SignUpPage;