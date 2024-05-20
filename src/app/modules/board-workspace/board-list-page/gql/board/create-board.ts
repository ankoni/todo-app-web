import { Board } from "../../../../../models/board-workspace/board";
import { gql } from "apollo-angular";

export interface ICREATE_BOARD {
    createBoard: Board;
}

export const CREATE_BOARD = gql`
    mutation createBoard($createBoard: CreateBoardInput!) {
        createBoard(createBoard: $createBoard) {
            id
            name
            description
        }
    }
`
