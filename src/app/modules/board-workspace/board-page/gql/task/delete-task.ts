import {gql} from "apollo-angular";

export interface IDELETE_TASK {
    deleteTask: string
}

export const DELETE_TASK =  gql`
    mutation deleteTask($id: String!) {
        deleteTask(id: $id)
    }
`