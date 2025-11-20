import zod from "@/zod/zod";

export const habitValidation = zod.object({
    title: zod.string().nonempty("Title is required").min(3, "Title can not be shorter than 3 chars").max(20, "Title can not be longer then 20 chars"),
    description: zod.string().optional(),
    time: zod.string().nonempty("Time is required"),
    deadline: zod.string().nonempty("Deadline is required"),
    targetValue: zod.string().refine((val) => Number(val) > 0, "Target value can not be less then 1").nonempty("Target is required"),
    targetUnit: zod.string().nonempty("Target unit is required").min(1, "Target Unit can not be shorter than 1 char").max(10, "Target Unit can not be shorter than 10 chars"),
    category: zod.preprocess((val => {
        if (val === undefined || val === null) return "";
        return String(val);
    }),zod.string().min(1, "Category is required")),
    frequency: zod.array(zod.string()).nonempty("Select habit frequency"),
});

export type HabitValidator = {
    title: string;
    description?: string;
    time: string;
    deadline: string;
    targetValue: string;
    targetUnit: string;
    category: string | unknown;
    frequency: string[];
};