import { Board } from "../../../../../models/board-workspace/board";
import { gql } from "apollo-angular";

export interface IGET_ONE_BOARD {
    getOneBoard: Board
}

export const GET_ONE_BOARD = gql`
    query getOneBoard($id: String!) {
        getOneBoard(id: $id) {
            id
            name
            description
        }
    }
`
