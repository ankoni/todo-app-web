import {TaskList} from "../../../../../models/board-workspace/task-list";
import {gql} from "apollo-angular";

export interface IGET_ONE_TASK_LIST {
    getOneTaskList: TaskList
}

export const GET_ONE_TASK_LIST = gql`
    query getOneTaskList($id: String!) {
        getOneTaskList(id: $id) {
            id
            name
            tasks {
                id
                name
            }
        }
    }
`