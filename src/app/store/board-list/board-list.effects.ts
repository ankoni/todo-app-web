import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Board } from "../../models/board-workspace/board";
import { Store } from "@ngrx/store";
import { BoardApiService } from "../../modules/board-workspace/board-list-page/services/board-api.service";
import {
    addNewBoard,
    AddNewBoardSuccess, getOneBoard, GetOneBoardSuccess,
    loadBoardList,
    LoadBoardListSuccess,
    removeBoard,
    RemoveBoardSuccess
} from "./board-list.actions";
import { filter, map, mergeMap, of, withLatestFrom } from "rxjs";
import { dummyAction, LoadTaskListsSuccess } from "../board-page/task-list/task-list.actions";
import { Router } from "@angular/router";

@Injectable()
export class BoardListEffects {
    constructor(
        private actions$: Actions,
        private store: Store<{ boardList: Board[] }>,
        private boardApiService: BoardApiService,
        private router: Router
    ) {
    }

    /** Загрузка досок */
    loadBoards$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(loadBoardList),
                withLatestFrom(this.store.select('boardList')),
                mergeMap(([action, storedBoards]) => {
                    if (!storedBoards.length) {
                        return this.boardApiService.loadAllBoards()
                            .pipe(
                                map((data: Board[]) =>
                                    new LoadBoardListSuccess(data)
                                )
                            )
                    }
                    return of(dummyAction());
                })
            )
    )

    addNewBoard$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(addNewBoard),
                mergeMap(({ data }) => {
                    return this.boardApiService.addNewBoard(data)
                        .pipe(
                            map((data: Board | undefined) => {
                                if (data) {
                                    this.router.navigate([`/boards/${data?.id}`])
                                    return new AddNewBoardSuccess(data)
                                }
                                return dummyAction()
                            })
                        )
                })
            )
    )

    getOneBoard$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(getOneBoard),
                mergeMap(({ id }) => {
                    return this.boardApiService.getBoardInfoById(id)
                        .pipe(
                            map((board: Board | null) => {
                                if (board?.taskLists) {
                                    this.store.dispatch(new LoadTaskListsSuccess(board.taskLists ?? []))
                                }
                                return board ? new GetOneBoardSuccess(board) : dummyAction()
                            })
                        )
                })
            )
    )

    removeBoard$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(removeBoard),
                mergeMap(({ id }) => {
                    return this.boardApiService.removeBoard(id)
                        .pipe(
                            map((id: string | undefined) =>
                                id ? new RemoveBoardSuccess(id) : dummyAction()
                            )
                        )
                })
            )
    )
}
