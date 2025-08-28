import { BackBtn } from "@/components/ui/back-btn/BackBtn";
import Logo from "@/components/ui/logo/Logo";
import { RegisterForm } from "@/components/register-form/RegisterForm";


const Register = () => {
    return (
        <div className="mt-[34px] h-[100vh] pb-40 bg-[url(/cubes.png)] bg-no-repeat  bg-top">
            <header className=" w-[84%] max-w-[1249px] mx-auto">
                <div className="flex justify-between items-center">
                    <BackBtn />
                    <Logo className={"hidden sm:flex"} />
                </div>
            </header>
            <main className="flex h-full justify-center">
                <RegisterForm />
            </main>
        </div>
    );
};

export default Register;