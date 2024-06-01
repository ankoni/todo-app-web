import {Task} from "../../../../../models/board-workspace/task";
import {gql} from "apollo-angular";

export interface IEDIT_TASK {
    updateTask: Task
}

export const EDIT_TASK = gql`
    mutation updateTask($updateTask: UpdateTaskInput!) {
        updateTask(updateTask: $updateTask) {
            id
            name
            description
            order
        }
    }
`
