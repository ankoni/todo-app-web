import {Task} from "../../../../../models/board-workspace/task";
import {gql} from "apollo-angular";

export interface IGET_ALL_TASKS {
    getAllTask: Task[]
}

export const GET_ALL_TASKS = gql`
    query getAllTask($listId: String!) {
        getAllTask(listId: $listId) {
            id
            name
            order
        }
    }
`