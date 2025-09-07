import { FieldError, FieldPath, UseFormRegister } from "react-hook-form";
import { SignInForm, SignUpForm } from "@/validators/authValidator";

type Props<T extends SignUpForm | SignInForm> = {
    labelFor: string,
    labelText: string,
    type: string,
    id: string,
    register: UseFormRegister<T>,
    value: FieldPath<T>,
    error?: FieldError

}

export const FormInput = <T extends SignUpForm | SignInForm>({
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
                className={`pl-3 py-1 border rounded-md font-medium text-[#33674E] dark:text-[#FFFFFF]/90
          ${
                    error
                        ? "border-red-500 outline-red-500"
                        : "border-[#34684F]/10 dark:border-[#FFFFFF]/10 outline-[#34684F]/80"
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