"use client";
import Image from "next/image";
import { MainBtn } from "@/components/ui/main-btn/MainBtn";
import { TypeBtnEnum } from "@/enums/typeBtnEnum";
import { FormInput } from "@/components/ui/input/formInput";
import { useForm } from "react-hook-form";
import { SignInForm, signInValidation } from "@/validators/authValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "@/services/api/auth";
import { FormChanger } from "@/components/ui/form-changer/FormChanger";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {

    const { register, reset, handleSubmit } = useForm<SignInForm>({ resolver: zodResolver(signInValidation) });

    const queryClient = useQueryClient()
    const router = useRouter();

    const [mounted, setMounted] = useState<boolean>(false);

    const { mutate,isPending } = useMutation({
            mutationFn: signIn<SignInForm>,
            onSuccess: async () => {
                await queryClient.invalidateQueries({ queryKey: ["user"] });
                router.push("/");
                reset();
            },
            onError: (error) => {
                throw new Error("Something went wrong", error);
            },
        })
    ;



    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className=" max-w-[300px]  mx-auto gradient transform-[translateY(30%)]  shadow-xl rounded-[18px]">
            <form onSubmit={handleSubmit(data => mutate(data))} className="px-[34px] py-[24px] flex flex-col  items-center
            ">
                <Image src="/svg/app-logo.svg" alt="App logo icon" width={40} height={40} />

                <h3 className="mt-2 text-[#34684F] dark:text-[#FFFFFF] text-[20px] font-medium">Sign in to TrackLy</h3>

                <div className="w-full mt-6">
                    <FormInput labelFor={"login"} labelText={"Username or email address"} type={"text"} id={"login"}
                               register={register} value={"login"} />
                    <FormInput labelFor={"password"} labelText={"Password"} type={"password"} id={"password"}
                               register={register} value={"password"} />
                </div>

                <MainBtn
                    type={TypeBtnEnum.BTN}
                    disabledValue={isPending}
                    path={"/sign-in"} className="bg-[#34684F] text-[#FFFFFF] text-[16px] mt-8">
                    Sign in
                </MainBtn>

                <a className="mt-4 opacity-[.4] text-[12px] dark:text-[#FFFFFF]/90">Forgot password</a>

                <FormChanger text={"Don`t have an account?"} link={"/sign-up"} linkText={"Sign up"} />
            </form>
        </div>
    );
};

export default LoginForm;