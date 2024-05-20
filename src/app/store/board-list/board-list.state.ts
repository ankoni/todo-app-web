import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Board } from "../../models/board-workspace/board";

export interface BoardListState extends EntityState<Board> {
}

export const boardListAdapter = createEntityAdapter<Board>();
export const initialState: BoardListState = boardListAdapter.getInitialState();
