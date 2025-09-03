import { FieldPath, UseFormRegister } from "react-hook-form";
import { SignInForm, SignUpForm } from "@/validators/authValidator";

type Props<T extends SignUpForm | SignInForm> = {
    labelFor:string,
    labelText:string,
    type:string,
    id:string,
    register:UseFormRegister<T>,
    value:FieldPath<T>,

}

export const FormInput = <T extends SignUpForm | SignInForm>({labelFor,labelText,type,id,register,value}:Props<T>) => {
    return (
        <label htmlFor={labelFor} className="flex flex-col gap-1  font-light">
                            <span
                                className="opacity-[.6] dark:opacity-40 text-[14px] text-[#34684F] dark:text-[#FFFFFF]">{labelText}</span>
            <input type={type} id={id}
                   {...register(value)}
                   className="pl-3 py-1 border border-[#34684F]/10 dark:border-[#FFFFFF]/10  outline-[#34684F]/80  rounded-md  font-medium text-[#33674E] dark:text-[#FFFFFF]/90" />
        </label>

    );
};

