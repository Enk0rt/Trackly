export interface IHabitChecks{
    _habitId: string;
    week: IChecks[];
}

export interface IChecks {
    day: string;
    date: Date;
    isChecked: boolean;
}

export interface IHabitChecksResponse {
    data: IHabitChecks[];
}