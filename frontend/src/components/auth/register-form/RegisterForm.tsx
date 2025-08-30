"use client";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { signUp } from "@/services/api/auth";
import { MainBtn } from "@/components/ui/main-btn/MainBtn";
import { TypeBtnEnum } from "@/enums/typeBtnEnum";
import zod from "@/zod/zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = zod.object({
    username: zod.string().min(3),
    email: zod.string(),
    password: zod.string().min(6),
    confirmPassword: zod.string().min(6).optional(),
    name: zod.string().optional(),
    surname: zod.string().optional()
})
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"], // помилка буде показана під цим полем
        message: "Passwords do not match",
    });

type SignUpForm = zod.infer<typeof schema>;

export const RegisterForm = () => {
    const { register, reset, handleSubmit } = useForm<SignUpForm>({ resolver: zodResolver(schema) });

    const { mutate, isPending, error } = useMutation({
        mutationFn: signUp<SignUpForm>,
        onSuccess: (user) => console.log("Registered:", user),
    });

    const onSubmit = (data: SignUpForm) => {
        const {confirmPassword, ...payload} = data
        console.log("TRANSFER DATA TO SERVER", data );
        mutate(payload);
    };

    return (
        <div>
            <div className="mx-auto gradient transform-[translateY(20%)]  shadow-xl rounded-[18px]">
                <form onSubmit={handleSubmit(onSubmit)} className="px-[34px] py-[24px] flex flex-col  items-center
            ">
                    <Image src="/svg/app-logo.svg" alt="App logo icon" width={40} height={40} />

                    <h3 className="mt-2 text-[#34684F] dark:text-[#FFFFFF] text-[20px] font-medium">Sign in to
                        TrackLy</h3>

                    <div className="w-full mt-6 grid grid-cols-2 gap-4">
                        <label htmlFor="username" className="flex flex-col gap-1  font-light">
                            <span
                                className="opacity-[.6] dark:opacity-40 text-[14px] text-[#34684F] dark:text-[#FFFFFF]">Username</span>
                            <input type="text"
                                   {...register("username")}
                                   className="pl-3 py-1 border border-[#34684F]/10 dark:border-[#FFFFFF]/10  outline-[#34684F]/80  rounded-md  font-medium text-[#33674E] dark:text-[#FFFFFF]/90" />
                        </label>

                        <label htmlFor="email" className="flex flex-col gap-1  font-light">
                            <span
                                className="opacity-[.6] dark:opacity-40 text-[14px] text-[#34684F] dark:text-[#FFFFFF]">Email</span>
                            <input type="email" {...register("email")}
                                   className="pl-3 py-1 border border-[#34684F]/10 dark:border-[#FFFFFF]/10 outline-[#34684F]/80 rounded-md  font-medium text-[#33674E] dark:text-[#FFFFFF]/90" />
                        </label>

                        <label htmlFor="password" className="flex flex-col gap-1  font-light">
                            <span
                                className="opacity-[.6] dark:opacity-40 text-[14px] text-[#34684F] dark:text-[#FFFFFF]">Password</span>
                            <input
                                autoComplete="new-password"
                                type="password"
                                {...register("password")}
                                className="pl-3 py-1 border border-[#34684F]/10 dark:border-[#FFFFFF]/10 outline-[#34684F]/80 rounded-md  font-medium text-[#33674E] dark:text-[#FFFFFF]/90" />
                        </label>

                        <label htmlFor="confirm-password" className="flex flex-col gap-1  font-light">
                            <span
                                className="opacity-[.6] dark:opacity-40 text-[14px] text-[#34684F]/100 dark:text-[#FFFFFF]">Confirm password</span>
                            <input
                                autoComplete="new-password"
                                type="password"
                                {...register("confirmPassword")}
                                className="pl-3 py-1 border border-[#34684F]/10 dark:border-[#FFFFFF]/10 outline-[#34684F]/80 rounded-md  font-medium text-[#33674E] dark:text-[#FFFFFF]/90" />
                        </label>

                        <label htmlFor="firstname" className="flex flex-col gap-1  font-light">
                            <span
                                className="opacity-[.6] dark:opacity-40 text-[14px] text-[#34684F] dark:text-[#FFFFFF]">Name</span>
                            <input type="text" {...register("name")}
                                   className="pl-3 py-1 border border-[#34684F]/10 dark:border-[#FFFFFF]/10 outline-[#34684F]/80 rounded-md  font-medium text-[#33674E] dark:text-[#FFFFFF]/90 " />
                        </label>

                        <label htmlFor="surname" className="flex flex-col gap-1  font-light">
                            <span
                                className="opacity-[.6] dark:opacity-40 text-[14px] text-[#34684F] dark:text-[#FFFFFF]">Surname</span>
                            <input type="text" {...register("surname")}
                                   className="pl-3 py-1 border border-[#34684F]/10 dark:border-[#FFFFFF]/10 outline-[#34684F]/80 rounded-md  font-medium text-[#33674E] dark:text-[#FFFFFF]/90" />
                        </label>


                    </div>

                    <MainBtn
                        type={TypeBtnEnum.BTN}
                        path={"/sign-in"} className="bg-[#34684F] text-[#FFFFFF] text-[16px] mt-8">
                        Sign up
                    </MainBtn>

                    <div className="mt-4 flex gap-1 text-[12px]">
                        <p className="opacity-[.4] dark:text-[#FFFFFF]/76">Already have account?</p>
                        <a href="/sign-in" className="opacity-[.8] underline underline-offset-4 dark:text-[#FFFFFF]/90">Sign
                            in</a>
                    </div>

                </form>
            </div>
        </div>
    );
};

