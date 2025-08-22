import { PlanTypeEnum } from "../enums/plan-type.enum";
import { RegexEnums } from "../enums/regex.enum";
import { zod } from "../zod";

export const planValidator = zod.object({
    name: zod
        .string({ required_error: "Name is required" })
        .min(4, "Plan name should be more then 4 chars long")
        .max(30, "Plan name shouldn't be more then 30 chars long")
        .nonempty("Name field can not be empty"),
    date: zod
        .string({ required_error: "Date is required" })
        .regex(new RegExp(RegexEnums.DATE), "Invalid date format"),
    description: zod
        .string()
        .max(500, "You have reached characters limit (500)")
        .optional(),
    type: zod.nativeEnum(PlanTypeEnum, {
        message: "Invalid plan type",
        required_error: "Plan type is required",
    }),
});
