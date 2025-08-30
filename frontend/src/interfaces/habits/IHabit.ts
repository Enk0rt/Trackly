export interface IHabit{
    name: string;
    userId: string;
    description: string;
    deadline: Date;
    isChecked: boolean;
    isSettled: boolean;
}