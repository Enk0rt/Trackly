import { RegexEnums } from "../enums/regex.enum";
import { zod } from "../zod";

export class AuthValidator {
    private static refresh = zod.string().trim();
    private static validate = zod.string().trim();
    private static recovery = zod.string().trim();
    private static email = zod.string().regex(new RegExp(RegexEnums.EMAIL), {
        message: "Email does not match required pattern",
    });
    private static password = zod
        .string()
        .regex(new RegExp(RegexEnums.PASSWORD), {
            message: "Password does not match required pattern",
        });

    public static signIn = zod.object({
        login: zod
            .string({
                required_error: "Login field as email or username is required",
            })
            .trim()
            .nonempty("Email or username is required"),
        password: zod
            .string({ required_error: "Password is required" })
            .nonempty("Password is required"),
    });

    public static refreshToken = zod.object({
        refreshToken: this.refresh,
    });
    public static validateToken = zod.object({
        refreshToken: this.validate,
    });
    public static recoveryToken = zod.object({
        refreshToken: this.recovery,
    });

    public static validateEmail = zod.object({
        email: this.email,
    });

    public static validatePassword = zod.object({
        password: this.password,
    });
}
