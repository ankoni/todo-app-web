import {TaskList} from "../../../../../models/board-workspace/task-list";
import {gql} from "apollo-angular";

export interface ICREATE_TASK_LIST {
    createTaskList: TaskList;
}

export const CREATE_TASK_LIST = gql`
    mutation createTaskList($createTaskList: CreateTaskListInput!) {
        createTaskList(createTaskList: $createTaskList) {
            id
            name
            tasks {
                id
                name
                order
            }
        }
    }
`