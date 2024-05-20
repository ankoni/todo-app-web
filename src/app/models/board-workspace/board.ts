import { TaskList } from "./task-list";

export interface Board {
    id: string;
    name: string;
    description?: string;
    taskLists?: TaskList[];
}

export type CreateBoardDialogData = {
    name: string;
    description?: string;
}
