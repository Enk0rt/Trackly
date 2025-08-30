export interface IGoal{
    _id: string;
    userId: string;
    name: string;
    description: string;
    deadline: Date;
    isSucceeded: boolean;
}