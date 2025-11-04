import { HabitHistoryTypeEnum } from "@/enums/HabitHistoryTypeEnum";

export interface IHabitHistory {
    id: string,
    habitId: string,
    type: HabitHistoryTypeEnum,
    isChecked: boolean,
    note: string,
    date: string
}

export interface IHabitHistoryResponse {
    data: IHabitHistory[],
    details: string
}

