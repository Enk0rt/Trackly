"use client";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { signUp } from "@/services/api/auth";
import { MainBtn } from "@/components/ui/main-btn/MainBtn";
import { TypeBtnEnum } from "@/enums/typeBtnEnum";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpValidation, SignUpForm } from "@/validators/authValidator";
import { FormInput } from "@/components/ui/input/formInput";
import { FormChangerLink } from "@/components/ui/form-changer-link/FormChangerLink";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { IApiErrorResponse } from "@/interfaces/errors/IError";
import { useRouter } from "next/navigation";


export const RegisterForm = () => {
    const {
        register,
        reset,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<SignUpForm>({ resolver: zodResolver(signUpValidation), mode: "onBlur", criteriaMode: "all" });

    const [mounted, setMounted] = useState<boolean>(false);
    const router = useRouter();
    const { mutate } = useMutation({
        mutationFn: signUp<SignUpForm>,
        onSuccess: () => {
            router.push("/");
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
        mutate(payload, {
            onSuccess: () => {
                reset();
            },
        });
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            <div className="mx-auto gradient transform-[translateY(20%)]  shadow-xl rounded-[18px]">
                <form onSubmit={handleSubmit(onSubmit)} className="px-[34px] py-[24px] flex flex-col  items-center
            ">
                    <Image src="/svg/app-logo.svg" alt="App logo icon" width={40} height={40} />

                    <h3 className="mt-2 text-[#34684F] dark:text-[#FFFFFF] text-[20px] font-medium">Sign in to
                        TrackLy</h3>

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
                        type={TypeBtnEnum.BTN}
                        path={"/sign-in"}
                        className="bg-[#34684F] text-[#FFFFFF] text-[16px] mt-8 hover:shadow-[0_2px_16px_rgba(12,49,44,40)] hover:dark:shadow-[0px_2px_16px_rgba(255,255,255,40)] mb-2">
                        Sign up
                    </MainBtn>


                    <FormChangerLink text={"Already have an account?"} link={"/sign-in"} linkText={"Sign in"} />

                </form>
            </div>
        </>
    );
};

