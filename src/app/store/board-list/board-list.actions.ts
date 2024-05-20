import { Action, createAction, props } from "@ngrx/store";
import { Board, CreateBoardDialogData } from "../../models/board-workspace/board";

/** Получение данных с бэка */
const LOAD_BOARD_LIST = '[Board List] Load data';
const LOAD_BOARD_LIST_SUCCESS = '[Board List] Get data success';

export const loadBoardList = createAction(LOAD_BOARD_LIST);
export const loadBoardListSuccess = createAction(LOAD_BOARD_LIST_SUCCESS, props<{boards: Board[]}>());

export class LoadBoardList implements Action {
    type = LOAD_BOARD_LIST;
    constructor() {
    }
}

export class LoadBoardListSuccess implements Action {
    type = LOAD_BOARD_LIST_SUCCESS;
    constructor(public boards: Board[]) {
    }
}

/** Информация о доске */
const GET_ONE_BOARD = '[Board] Get one board info';
const GET_ONE_BOARD_SUCCESS = '[Board] Get one board info success';
export const getOneBoard = createAction(GET_ONE_BOARD, props<{id: string}>())
export const getOneBoardSuccess = createAction(GET_ONE_BOARD_SUCCESS, props<{board: Board}>())

export class GetOneBoard implements Action {
    type = GET_ONE_BOARD
    constructor(public id: string) {
    }
}
export class GetOneBoardSuccess implements Action {
    type = GET_ONE_BOARD_SUCCESS
    constructor(public board: Board) {
    }
}

/** Добавление доски */
const ADD_NEW_BOARD = '[Board] Add new';
const ADD_NEW_BOARD_SUCCESS = '[Board] Board added success';

export const addNewBoard = createAction(ADD_NEW_BOARD, props<{ data: CreateBoardDialogData }>());
export const addNewBoardSuccess = createAction(ADD_NEW_BOARD_SUCCESS, props<{ board: Board }>());

export class AddNewBoard implements Action {
    type = ADD_NEW_BOARD;
    constructor(public data: CreateBoardDialogData) {
    }
}

export class AddNewBoardSuccess implements Action {
    type = ADD_NEW_BOARD_SUCCESS;
    constructor(public board: Board) {
    }
}

/** Удаление доски */
const REMOVE_BOARD = '[Board List] Remove';
const REMOVE_BOARD_SUCCESS = '[Board List] Remove success';

export const removeBoard = createAction(REMOVE_BOARD, props<{ id: string }>());
export const removeBoardSuccess = createAction(REMOVE_BOARD_SUCCESS, props<{ id: string }>());

export class RemoveBoard implements Action {
    type = REMOVE_BOARD;

    constructor(public id: string) {
    }
}

export class RemoveBoardSuccess implements Action {
    type = REMOVE_BOARD_SUCCESS;

    constructor(public id: string) {
    }
}