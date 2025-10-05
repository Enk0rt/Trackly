"use client";
import { FormInput } from "@/components/ui/input/formInput";
import { useForm } from "react-hook-form";
import { EmailPasswordRecoveryForm, emailValidation } from "@/validators/authValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeBtnEnum } from "@/enums/typeBtnEnum";
import { useMutation } from "@tanstack/react-query";
import { sendRecoveryRequest } from "@/services/api/auth";
import { AxiosError } from "axios";
import { IApiErrorResponse } from "@/interfaces/errors/IError";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { MainBtn } from "@/components/ui/buttons/main-btn/MainBtn";

type Props = {
    setIsSuccess: Dispatch<SetStateAction<boolean>>,
    setEmail: Dispatch<SetStateAction<string>>
}

export const PassRecoveryRequestEmailForm = ({ setIsSuccess, setEmail }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm<EmailPasswordRecoveryForm>({ resolver: zodResolver(emailValidation), mode: "onBlur" });

    const { mutate, isPending } = useMutation({
        mutationFn: sendRecoveryRequest,
        onSuccess: () => setIsSuccess(true),
        onError: (error => {
            const axiosError = error as AxiosError<IApiErrorResponse>;
            const backendMessage = axiosError.response?.data?.details || "Unexpected error";
            const field = axiosError.response?.data?.field;

            if (field) {
                setError(field as keyof EmailPasswordRecoveryForm, { type: "server", message: backendMessage });
            } else {
                setError("root", { type: "server", message: backendMessage });
            }
        }),
    });

    const onSubmit = ({ email }: EmailPasswordRecoveryForm) => {
        mutate(email, {
            onSuccess: () => {
                setEmail(email);
                localStorage.setItem("passwordRecoveryTimer", (Date.now() + (3 * 60) * 1000).toString());
                reset();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {
                errors.root?.message &&
                <p className="text-red-500 text-[12px] mt-1 space-y-1">
                    {errors.root.message}
                </p>
            }
            <FormInput labelFor={"email"} labelText={"Email"} type={"email"} id={"email"} register={register}
                       value={"email"} error={errors.email} />

            <div className="flex gap-5 items-center">
                <MainBtn type={TypeBtnEnum.SUBMIT}
                         disabledValue={isPending}
                         className={`bg-[#34684F] text-[#FFFFFF] sm:text-[18px] mt-3 hover:shadow-[0px_2px_3px_rgba(12,49,44,40)] hover:translate-y-[-4px] transform hover:dark:shadow-[0px_2px_4px_rgba(255,255,255,40)] ${isPending && "opacity-80 !cursor-default hover:shadow-[unset] hover:translate-y-[none]"} `}>
                    Send
                    {
                        isPending &&
                        <>
                            <span className="opacity-0  delay-[0] animate-pulse">.</span>
                            <span className="opacity-0  delay-[1s] animate-pulse">.</span>
                            <span className="opacity-0  delay-[3s] animate-pulse">.</span>
                        </>
                    }
                </MainBtn>
                <Link href="/"
                      className="w-fit mt-2 block sm:text-[14px] text-[#33674E] dark:text-white underline underline-offset-2 transition duration-300 ease-in-out opacity-50 hover:opacity-100">
                    To home page</Link>
            </div>
        </form>
    );
};

