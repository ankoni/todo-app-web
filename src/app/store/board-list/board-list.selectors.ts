import { createFeatureSelector, createSelector } from "@ngrx/store";
import { boardListAdapter, BoardListState } from "./board-list.state";

const getBoardListState = createFeatureSelector<BoardListState>('boardList');
export const boardListSelectors = boardListAdapter.getSelectors();

export const getBoardList = createSelector(getBoardListState, boardListSelectors.selectAll);
