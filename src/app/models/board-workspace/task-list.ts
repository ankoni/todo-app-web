import { Task } from "./task";

export interface TaskList {
    id: string;
    name: string;
    order: number;
    tasks: Task[];
}

export type CreateTaskListDialogData = {
    name: string;
}
