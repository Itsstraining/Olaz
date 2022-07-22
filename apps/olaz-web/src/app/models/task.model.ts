/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TaskModel{
    title: string,
    status: string,
    description: string,
    assignee: any,
    reporter: any,
    deadline: number,
    priority: string
}