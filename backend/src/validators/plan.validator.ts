import { ImportanceEnum } from "../enums/importance.enum";
import { RegexEnums } from "../enums/regex.enum";
import { validatePlanTime } from "../utils/validatePlanTime";
import { zod } from "../zod";

export const planValidator = zod.object({
    name: zod
        .string({ required_error: "Name is required" })
        .min(4, "Plan name should be more then 4 chars long")
        .max(30, "Plan name shouldn't be more then 30 chars long")
        .nonempty("Name field can not be empty"),
    time: zod.preprocess(
        (val) => {
            if (typeof val == "string") {
                val = validatePlanTime(val);
            }
            return val;
        },
        zod
            .string({ required_error: "Time is required" })
            .regex(new RegExp(RegexEnums.TIME), "Invalid time format")
            .nonempty("Time field can not be empty"),
    ),

    importance: zod.nativeEnum(ImportanceEnum, {
        required_error: "Name is required",
    }),
});
