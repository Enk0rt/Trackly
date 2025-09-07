import zod from "@/zod/zod";

export const signUpValidation = zod.object({
    username: zod.string().min(3),
    email: zod.string(),
    password: zod.string().min(6),
    confirmPassword: zod.string().min(6).optional(),
    name: zod.string().optional(),
    surname: zod.string().optional(),
})
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export const signInValidation = zod.object({
    login: zod.string().nonempty("Required").min(3, "Minimum 3 characters" ),

    password: zod.string().nonempty("Password is required").min(6,"Minimum 6 chars"),
});


export type SignUpForm = zod.infer<typeof signUpValidation>;
export type SignInForm = zod.infer<typeof signInValidation>;