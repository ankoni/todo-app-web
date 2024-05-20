import {gql} from "apollo-angular";

export interface IREMOVE_BOARD {
    id: string;
}

export const REMOVE_BOARD = gql`
    mutation removeBoard($id: String!) {
        removeBoard(id: $id)
    }
`