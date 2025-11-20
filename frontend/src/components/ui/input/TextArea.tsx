import { FieldError, FieldPath, UseFormRegister } from "react-hook-form";
import { HabitValidator } from "@/validators/habitValidator";

type Props<T extends HabitValidator> = {
    labelFor: string
    labelText: string
    error: FieldError
    register: UseFormRegister<T>
    registerValue:FieldPath<T>
}
const TextArea =  <T extends HabitValidator>({ labelFor,labelText,error, register,registerValue }:Props<T>) => {
    return (
        <label htmlFor={labelFor} className="mt-1 flex flex-col  gap-1 font-light">
                        <span className="opacity-[.6] dark:opacity-40 text-[14px] text-[#34684F] dark:text-[#FFFFFF]">
                             {labelText} {error && <span className="text-red-500">*</span>}
                        </span>
            <textarea id={labelFor}
                      rows={3}
                      className={`pl-3 py-1 grow-1 border rounded-[8px] font-light text-sm lg:text-md text-[#33674E] dark:text-[#FFFFFF]/90 space tracking-[2px] min-h-[80px] 
                                  ${error
                          ? "border-red-500 !outline-none focus-within:border-[#34684F]/50 dark:focus-within:border-[#FFFFFF]/50"
                          : " dark:border-[#FFFFFF]/50 !outline-none focus-within:border-[#34684F]/60 dark:focus-within:border-[#FFFFFF]"
                      }`} {...register(registerValue)} />
            <div className={`text-red-500 text-[12px] ${error ? "mt-1" : ""} space-y-1`}>
                {error &&
                    <p>{error.message}</p>
                }
            </div>
        </label>
    );
};

export default TextArea;