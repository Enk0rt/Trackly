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
import { FormChangerLink } from "@/components/ui/form-changer-link/FormChangerLink";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { IApiErrorResponse } from "@/interfaces/errors/IError";
import Link from "next/link";

const LoginForm = () => {

    const {
        register,
        reset,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<SignInForm>({ resolver: zodResolver(signInValidation), mode: "onBlur", criteriaMode: "all" });

    const queryClient = useQueryClient();
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: signIn<SignInForm>,
        onSuccess: async (res) => {
            await queryClient.setQueryData(["user"], res.user);
            router.push("/");
            reset();
        },
        onError: (error) => {
            const axiosError = error as AxiosError<IApiErrorResponse>;
            const backendMessage = axiosError.response?.data?.details || "Unexpected error";

            setError(("root"), { type: "server", message: backendMessage });
        },
    });


    return (
        <div className=" max-w-[300px]  mx-auto gradient transform-[translateY(30%)]  shadow-xl rounded-[18px]">
            <form onSubmit={handleSubmit(data => mutate(data))} className="px-[34px] py-[24px] flex flex-col  items-center
            ">
                <Image src="/svg/app-logo.svg" alt="App logo icon" width={40} height={40} />

                <h3 className="mt-2 text-[#34684F] dark:text-[#FFFFFF] text-[20px] font-medium">Sign in to TrackLy</h3>

                {
                    errors.root?.message &&
                    <p className="text-red-500 text-[12px] mt-1 space-y-1">
                        {errors.root.message}
                    </p>
                }

                <div className="w-full mt-6">
                    <FormInput labelFor={"login"} labelText={"Username or email address"} type={"text"} id={"login"}
                               register={register} value={"login"} error={errors.login} />
                    <FormInput labelFor={"password"} labelText={"Password"} type={"password"} id={"password"}
                               register={register} value={"password"} error={errors.password} />
                </div>

                <MainBtn
                    type={TypeBtnEnum.BTN}
                    disabledValue={isPending}
                    path={"/sign-in"}
                    className="bg-[#34684F] text-[#FFFFFF] text-[16px] mt-8 hover:shadow-[0_2px_16px_rgba(12,49,44,40)] hover:dark:shadow-[0px_2px_16px_rgba(255,255,255,40)]">
                    Sign in
                </MainBtn>

                <Link href={'/recovery'}
                      className="mt-4 opacity-[.4] text-[12px] dark:text-[#FFFFFF]/90 text-[#34684F] cursor-pointer hover:opacity-100 transition duration-300 ease-in-out">
                    Forgot password
                </Link>

                <FormChangerLink text={"Don`t have an account?"} link={"/sign-up"} linkText={"Sign up"} />
            </form>
        </div>
    );
};

export default LoginForm;