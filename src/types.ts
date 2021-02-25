export enum TaskStatus{
    created = 1,
    completed,
    canceled,
    closed,
}
export interface Task {
    id: number;
    title: string;
    contractor_id: number,
    status: TaskStatus;
}
export interface User {
    id: number;
    first_name: string;
    last_name: string;
}
export interface StatusName {
    id: number;
    title: string;
}
