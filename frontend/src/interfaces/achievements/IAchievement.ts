export interface IAchievement {
    _id: string,
    userId: string,
    title: string;
    icon: string;
    description: string;
    currentValue: number;
    targetValue: number;

}