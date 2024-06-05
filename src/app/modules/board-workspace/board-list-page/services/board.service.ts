import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Board, CreateBoardDialogData } from "../../../../models/board-workspace/board";
import { Store } from "@ngrx/store";
import { getBoardList } from "../../../../store/board-list/board-list.selectors";
import { AddNewBoard, GetOneBoard, LoadBoardList, RemoveBoard } from "../../../../store/board-list/board-list.actions";

@Injectable()
export class BoardService {
    constructor(
        private store: Store<{ boards: Board[] }>
    ) {
    }

    getAllBoards(): Observable<Board[]> {
        this.store.dispatch(new LoadBoardList());
        return this.store.select(getBoardList);
    }

    getOneBoard(boardId: string): Observable<Board> {
        this.store.dispatch(new GetOneBoard(boardId))
        return this.getBoardByIdFromStore(boardId)
    }

    getBoardByIdFromStore(id: string): Observable<Board> {
        return <Observable<Board>>this.store.select(getBoardList)
            .pipe(
                map((boards: Board[]) => boards.find((board: Board) => board.id === id))
            )
    }

    addNewBoard(data: CreateBoardDialogData): void {
        this.store.dispatch(new AddNewBoard(data))
    }

    removeBoard(id: string): void {
        this.store.dispatch(new RemoveBoard(id));
    }
}
