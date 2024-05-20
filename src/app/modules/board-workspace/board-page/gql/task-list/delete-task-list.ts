import {gql} from "apollo-angular";

export interface IDELETE_TASK_LIST {
    removeTaskList: string
}

export const DELETE_TASK_LIST = gql`
    mutation removeTaskList($id: String!) {
        removeTaskList(id: $id)
    }
`