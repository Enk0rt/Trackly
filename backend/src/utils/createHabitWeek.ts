import dayjs from "dayjs";

import { IHabitHistoryEntry } from "../interfaces/habit-history.interface";

export const buildWeek = (
    habitEntries: IHabitHistoryEntry[] | null,
    startOfWeek: dayjs.Dayjs,
) => {
    return Array.from({ length: 7 }).map((_, i) => {
        const date = startOfWeek.add(i, "day");

        const entry = habitEntries
            ? habitEntries.find((entry) =>
                  dayjs(entry.date).isSame(date, "day"),
              )
            : null;

        return {
            day: date.format("ddd"),
            date: date.toDate(),
            isChecked: !!entry?.isChecked,
        };
    });
};
