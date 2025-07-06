import { RegexEnums } from "../enums/regex.enum";
import { zod } from "../zod";

export class UserValidator {
    public static createUser = zod.object({
        username: zod
            .string({ required_error: "Username is required" })
            .trim()
            .nonempty("Username is required"),
        email: zod
            .string({ required_error: "Email is required" })
            .email("Invalid email format")
            .trim()
            .nonempty("Email is required"),
        password: zod
            .string({ required_error: "Password is required" })
            .regex(new RegExp(RegexEnums.PASSWORD), "Invalid password format")
            .nonempty("Password is required"),
        name: zod
            .string()
            .regex(new RegExp(RegexEnums.NAME), "Invalid name format")
            .optional(),
        surname: zod
            .string()
            .regex(new RegExp(RegexEnums.NAME), "Invalid surname format")
            .optional(),
        age: zod.preprocess((val) => {
            if (typeof val === "string") {
                const parsed = Number(val);
                return isNaN(parsed) ? val : parsed;
            }
            return val;
        }, zod.number().min(2, "Age must be more then 0").max(100, "Age must be less then 200").optional()),
        phoneNumber: zod
            .string()
            .regex(new RegExp(RegexEnums.PHONE), "Invalid phone number format")
            .optional(),
        city: zod
            .string()
            .regex(new RegExp(RegexEnums.CITY), "Invalid city format")
            .optional(),
    });

    public static updateUser = zod.object({
        name: zod
            .string()
            .regex(new RegExp(RegexEnums.NAME), "Invalid name format")
            .optional(),
        surname: zod
            .string()
            .regex(new RegExp(RegexEnums.NAME), "Invalid surname format")
            .optional(),
        age: zod.preprocess((val) => {
            if (typeof val === "string") {
                const parsed = Number(val);
                return isNaN(parsed) ? val : parsed;
            }
            return val;
        }, zod.number().min(2, "Age must be more then 0").max(200, "Age must be less then 200").optional()),
        phoneNumber: zod
            .string()
            .regex(new RegExp(RegexEnums.PHONE), "Invalid phone number  format")
            .optional(),
        city: zod
            .string()
            .regex(new RegExp(RegexEnums.CITY), "Invalid city format")
            .optional(),

        height: zod.preprocess((val: string): number => {
            const num: string[] = [];
            val.split("").map((item) => Number(item) && num.push(item));
            return Number(num.join(","));
        }, zod.number().min(0, "Height must be more then 0").max(200, "Height must be less then 200").optional()),

        weight: zod.preprocess((val: string): number => {
            const num: string[] = [];
            val.split("").map((item) => Number(item) && num.push(item));
            return Number(num.join(","));
        }, zod.number().min(0, "Weight must be more then 0").max(300, "Weight must be less then 300").optional()),

        targetWeight: zod.preprocess((val: string): number => {
            const num: string[] = [];
            val.split("").map((item) => Number(item) && num.push(item));
            return Number(num.join(","));
        }, zod.number().min(0, "Target weight must be more then 0").max(300, "Target weight must be less then 300").optional()),

        targetWaterBalance: zod.preprocess((val) => {
            if (typeof val === "string") {
                const parsed = Number(val);
                return isNaN(parsed) ? val : parsed;
            }
            return val;
        }, zod.number().min(0, "Target water balance must be more then 0").max(10, "Target water balance must be less then 10").optional()),
    });
}
