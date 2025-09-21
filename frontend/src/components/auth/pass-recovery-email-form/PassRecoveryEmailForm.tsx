"use client";
import { FormInput } from "@/components/ui/input/formInput";
import { useForm } from "react-hook-form";
import { ChangePasswordForm, passwordValidation } from "@/validators/authValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { changePasswordFromEmail } from "@/services/api/auth";
import { AxiosError } from "axios";
import { IApiErrorResponse } from "@/interfaces/errors/IError";
import { MainBtn } from "@/components/ui/main-btn/MainBtn";
import { TypeBtnEnum } from "@/enums/typeBtnEnum";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type Props = {
    token: string;
    setIsSuccess: Dispatch<SetStateAction<boolean>>
    isTimeRunOut: boolean;
}

export const PassRecoveryEmailForm = ({ token, setIsSuccess, isTimeRunOut }: Props) => {
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        setError,
    } = useForm<ChangePasswordForm>({ resolver: zodResolver(passwordValidation) });

    const { mutate, isPending } = useMutation({
        mutationFn: changePasswordFromEmail,
        onSuccess: () => {
            setIsSuccess(true);
        },
        onError: (error => {
            const axiosError = error as AxiosError<IApiErrorResponse>;
            const backendMessage = axiosError.response?.data?.details || "Unexpected error";
            const field = axiosError.response?.data?.field;

            if (field) {
                setError(field as keyof ChangePasswordForm, { type: "server", message: backendMessage });
            } else {
                setError("root", { type: "server", message: backendMessage });
            }
        }),
    });

    const onSubmit = (data: ChangePasswordForm) => {
        mutate({ token, password: data.password }, {
            onSuccess: () => {
                localStorage.removeItem('passwordRecoveryTimer');
                reset()
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
            {
                errors.root?.message &&
                <p className="text-red-500 text-[12px] mt-1 space-y-1">
                    {errors.root.message}
                </p>
            }

            <FormInput type={"password"} id={"password"} register={register} value={"password"}
                       labelText={"Password"} labelFor={"password"} error={errors.password} />
            <FormInput type={"password"} id={"confirmPassword"} register={register}
                       value={"confirmPassword"} labelText={"Confirm Password"}
                       labelFor={"confirmPassword"}
                       error={errors.confirmPassword} />
            <div className="mt-3 flex gap-5 items-center">
                <MainBtn type={TypeBtnEnum.SUBMIT}
                         disabledValue={!(isPending || !isTimeRunOut)}
                         className={`bg-[#34684F] text-[#FFFFFF] sm:text-[16px] ${isTimeRunOut && 'opacity-50 !cursor-default hover:shadow-[unset]'}  mt-3 hover:shadow-[0_2px_16px_rgba(12,49,44,40)] hover:dark:shadow-[0px_2px_16px_rgba(255,255,255,40)]`}>
                    Change password
                </MainBtn>
                <Link href="/"
                      className="w-fit mt-2 block text-[#33674E] text-[12px] dark:text-white underline underline-offset-2 transition duration-300 ease-in-out will-change-transform origin-center hover:scale-110 opacity-50 hover:opacity-100">To
                    home page</Link>
            </div>
        </form>
    );
};

