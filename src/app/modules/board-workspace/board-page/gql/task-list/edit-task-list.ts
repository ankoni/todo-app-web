import { gql } from "apollo-angular";
import { TaskList } from "../../../../../models/board-workspace/task-list";

export interface IEDIT_TASK_LIST {
    updateTaskList: TaskList
}

export const EDIT_TASK_LIST = gql`
    mutation editTaskList($updateTaskList: UpdateTaskListInput!) {
        updateTaskList(updateTaskList: $updateTaskList) {
            id
            name
            order
        }
    }
`
