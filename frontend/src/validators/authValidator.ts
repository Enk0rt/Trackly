import zod from "@/zod/zod";
import { RegexEnums } from "@/enums/regexEnum";

export const signUpValidation = zod.object({
    username: zod.string().nonempty("Username required").min(3, "Minimum 3 characters required"),
    email: zod.string().nonempty("Email required").regex(new RegExp(RegexEnums.EMAIL), "Invalid email format (ex. a1a@gmail.com)"),
    password: zod.string().nonempty("Password required").min(6, "Minimum 6 characters required").regex(new RegExp(RegexEnums.PASSWORD), "Invalid password format (ex. Pa$$123)"),
    confirmPassword: zod.string().nonempty("Confirm password required").optional(),
    name: zod.string().optional(),
    surname: zod.string().optional(),
})
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export const signInValidation = zod.object({
    login: zod.string().nonempty("Login is required"),
    password: zod.string().nonempty("Password is required"),
});


export type SignUpForm = zod.infer<typeof signUpValidation>;
export type SignInForm = zod.infer<typeof signInValidation>;