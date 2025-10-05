"use client";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { signUp } from "@/services/api/auth";
import { TypeBtnEnum } from "@/enums/typeBtnEnum";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpValidation, SignUpForm } from "@/validators/authValidator";
import { FormInput } from "@/components/ui/input/formInput";
import { FormChangerLink } from "@/components/ui/form-changer-link/FormChangerLink";
import { AxiosError } from "axios";
import { IApiErrorResponse } from "@/interfaces/errors/IError";
import { useRouter } from "next/navigation";
import { MainBtn } from "@/components/ui/buttons/main-btn/MainBtn";
import { memo } from "react";
import Error from "es-errors";


const RegisterForm = () => {
    const {
        register,
        reset,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<SignUpForm>({ resolver: zodResolver(signUpValidation), mode: "onBlur", criteriaMode: "all" });

    const router = useRouter();
    const { mutate,isPending } = useMutation({
        mutationFn: signUp<SignUpForm>,
        onSuccess: () => {
            reset();
            router.push("/verify");
        },
        onError: (error => {
            const axiosError = error as AxiosError<IApiErrorResponse>;
            const backendMessage = axiosError.response?.data?.details || "Unexpected error";
            const field = axiosError.response?.data?.field;

            if (field) {
                setError(field as keyof SignUpForm, { type: "server", message: backendMessage });
            } else {
                setError("root", { type: "server", message: backendMessage });
            }
        }),
    });

    const onSubmit = (data: SignUpForm) => {
        const { confirmPassword, ...payload } = data;
        if (!confirmPassword) {
            throw new Error("Passwords don`t match");
        }
        mutate(payload)
    };

    return (
        <>
            <div className="mx-auto gradient transform-[translateY(20%)]  shadow-xl rounded-[18px] backdrop-blur-[10px]">
                <form onSubmit={handleSubmit(onSubmit)} className="px-[34px] py-[24px] flex flex-col  items-center
            ">

                    <Image src="/svg/app-logo.svg" alt="App logo icon" width={40} height={40} />

                    <h3 className="mt-2 text-[#34684F] dark:text-[#FFFFFF] text-[20px] font-medium">Sign up to
                        TrackLy</h3>

                    {
                        errors.root?.message &&
                        <p className="text-red-500 text-[12px] mt-1 space-y-1">
                            {errors.root.message}
                        </p>
                    }

                    <div className="w-full mt-6 grid grid-cols-2 gap-4">
                        <FormInput type={"text"} id={"username"} register={register} value={"username"}
                                   labelText={"Username"} labelFor={"username"} error={errors.username} />
                        <FormInput type={"email"} id={"email"} register={register} value={"email"}
                                   labelText={"Email"}
                                   labelFor={"email"} error={errors.email} />
                        <FormInput type={"password"} id={"password"} register={register} value={"password"}
                                   labelText={"Password"} labelFor={"password"} error={errors.password} />
                        <FormInput type={"password"} id={"confirmPassword"} register={register}
                                   value={"confirmPassword"} labelText={"Confirm Password"}
                                   labelFor={"confirmPassword"}
                                   error={errors.confirmPassword} />
                        <FormInput type={"text"} id={"name"} register={register} value={"name"} labelText={"Name"}
                                   labelFor={"name"} error={errors.name} />
                        <FormInput type={"text"} id={"surname"} register={register} value={"surname"}
                                   labelText={"Surname"} labelFor={"surname"} error={errors.surname} />
                    </div>

                    <MainBtn
                        type={TypeBtnEnum.SUBMIT}
                        className={`bg-[#34684F] text-[#FFFFFF] sm:text-[18px] mt-8 hover:shadow-[0_2px_4px_rgba(12,49,44,40)] transform hover:translate-y-[-4px] hover:dark:shadow-[0px_2px_4px_rgba(255,255,255,40)] ${isPending && 'opacity-80 !cursor-default hover:shadow-[unset] hover:translate-y-[none]'} `}>
                        Sign up
                        {
                            isPending &&
                            <>
                                <span className="opacity-0  delay-[0] animate-pulse">.</span>
                                <span className="opacity-0  delay-[1s] animate-pulse">.</span>
                                <span className="opacity-0  delay-[3s] animate-pulse">.</span>
                            </>
                        }
                    </MainBtn>


                    <FormChangerLink text={"Already have an account?"} link={"/sign-in"} linkText={"Sign in"} className={'mt-3'} />

                </form>
            </div>
        </>
    );
};

export default memo(RegisterForm)