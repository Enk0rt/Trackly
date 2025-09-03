import zod from "@/zod/zod";

export const signUpValidation = zod.object({
    username: zod.string().min(3),
    email: zod.string(),
    password: zod.string().min(6),
    confirmPassword: zod.string().min(6).optional(),
    name: zod.string().optional(),
    surname: zod.string().optional()
})
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export const signInValidation = zod.object({
    login:zod.string().min(3),
    password: zod.string().min(6)
})

export type SignUpForm = zod.infer<typeof signUpValidation>;
export type SignInForm = zod.infer<typeof signInValidation>;