import { FieldError, FieldPath, UseFormRegister } from "react-hook-form";
import { ChangePasswordForm, EmailPasswordRecoveryForm, SignInForm, SignUpForm } from "@/validators/authValidator";
import { HabitValidator } from "@/validators/habitValidator";

type Props<T extends SignUpForm | SignInForm | ChangePasswordForm | EmailPasswordRecoveryForm | HabitValidator> = {
    labelFor: string,
    labelText: string,
    type: string,
    id: string,
    register: UseFormRegister<T>,
    value: FieldPath<T>,
    error?: FieldError

}

export const FormInput = <T extends SignUpForm | SignInForm | ChangePasswordForm | EmailPasswordRecoveryForm | HabitValidator>({
       labelFor,
       labelText,
       type,
       id,
       register,
       value,
       error,
   }: Props<T>) => {

    return (
        <label htmlFor={labelFor} className="mt-1 flex flex-col gap-1 font-light">
      <span className="opacity-[.6] dark:opacity-40 text-[14px] text-[#34684F] dark:text-[#FFFFFF]">
        {labelText} {error && <span className="text-red-500">*</span>}
      </span>
            <input
                type={type}
                id={id}
                {...register(value)}
                className={`pl-3 py-1 border rounded-[8px] font-light text-[#33674E] dark:text-[#FFFFFF]/90 space tracking-[2px]
          ${
                    error
                        ? "border-red-500 !outline-none focus-within:border-[#34684F]/50 dark:focus-within:border-[#FFFFFF]/50"
                        : "border-[#33674E] !outline-none dark:border-white/60 focus-within:border-[#34684F]/60 dark:focus-within:border-[#FFFFFF]"
                }`}
            />
            {error && (
                <div className="text-red-500 text-[12px] mt-1 space-y-1">
                    {error &&
                        <p>{error.message}</p>
                    }
                </div>
            )}
        </label>
    );
};