import { Board } from "../../../../../models/board-workspace/board";
import { gql } from "apollo-angular";

export interface IGET_ALL_BOARDS {
    getAllBoards: Board[];
}

export const GET_ALL_BOARDS = gql`
    query getAllBoards {
        getAllBoards {
            id
            name
            description
        }
    }
`
