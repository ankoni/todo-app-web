import { createReducer, on } from "@ngrx/store";
import { boardListAdapter, initialState } from "./board-list.state";
import { addNewBoardSuccess, getOneBoardSuccess, loadBoardListSuccess, removeBoardSuccess } from "./board-list.actions";

export const boardListReducer = createReducer(
    initialState,
    on(loadBoardListSuccess, (state, action) => {
        return boardListAdapter.setAll(action.boards, state);
    }),
    on(getOneBoardSuccess, (state, { board}) => {
       return state.ids.some((id) => id === board.id)
           ? boardListAdapter.updateOne({ id: board.id, changes: board }, state)
           : boardListAdapter.addOne(board, state)
    }),
    on(addNewBoardSuccess, (state, action) => {
        return boardListAdapter.addOne(action.board, state);
    }),
    on(removeBoardSuccess, (state, action) => {
        return boardListAdapter.removeOne(action.id, state);
    })
);
