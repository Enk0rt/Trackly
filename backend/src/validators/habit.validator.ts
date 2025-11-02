import { RegexEnums } from "../enums/regex.enum";
import { zod } from "../zod";

export class habitValidator {
    public static habit = zod.object({
        title: zod
            .string({ required_error: "Name is required" })
            .min(4, "Plan name should be more then 4 chars long")
            .max(30, "Plan name shouldn't be more then 30 chars long")
            .nonempty("Name field can not be empty"),
        description: zod
            .string()
            .max(500, "You have reached characters limit (500)")
            .optional(),
        time: zod
            .string({ required_error: "Time is required" })
            .regex(new RegExp(RegexEnums.TIME)),
        deadline: zod.string().optional(),
        targetUnit: zod.string({ required_error: "Target unit is required" }),
        category: zod.string({ required_error: "Category is required" }),
    });

    public static history = zod.object({
        type: zod.string({ required_error: "Action type is required" }),
        note: zod
            .string()
            .max(300, "You have reached characters limit (300)")
            .optional(),
        currentValue: zod.preprocess((val) => {
            if (typeof val === "string") {
                const parsed = Number(val);
                return isNaN(parsed) ? val : parsed;
            }
            return val;
        }, zod.number().min(1, "Minimum allowed value is 1").optional()),
    });
}
