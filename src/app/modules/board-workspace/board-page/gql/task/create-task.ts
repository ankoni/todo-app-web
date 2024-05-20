import {Task} from "../../../../../models/board-workspace/task";
import {gql} from "apollo-angular";

export interface ICREATE_TASK {
    createTask: Task;
}

export const CREATE_TASK = gql`
    mutation createTask($createTask: CreateTaskInput!) {
        createTask(createTask: $createTask) {
            id
            name
            order
        }
    }
`