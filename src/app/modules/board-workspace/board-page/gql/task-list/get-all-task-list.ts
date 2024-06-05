import {TaskList} from "../../../../../models/board-workspace/task-list";
import {gql} from "apollo-angular";

export interface IGET_ALL_TASK_LIST {
    getAllTaskList: TaskList[];
}

export const GET_ALL_TASK_LIST = gql`
    query getAllTaskList($boardId: String!) {
        getAllTaskList(boardId: $boardId) {
            id
            name
            order
            tasks {
                id
                name
                description
                order
            }
        }
    }
`
