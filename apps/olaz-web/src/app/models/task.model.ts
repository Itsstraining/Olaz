/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TaskModel{
    id: string,
    title: string,
    status: number,
    description: string,
    assignee: any,
    reporter: any,
    deadline: number,
    priority: number,
    createdBy: any,
    createdDate: number,
    updatedDate: number
}