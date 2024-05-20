import { fakeAsync, flush, TestBed } from '@angular/core/testing';

import { BoardApiService } from './board-api.service';
import { ApolloTestingController, ApolloTestingModule } from "apollo-angular/testing";
import { take } from "rxjs";
import { GET_ALL_BOARDS } from "../gql/board/get-all-boards";
import { CREATE_BOARD } from "../gql/board/create-board";
import { REMOVE_BOARD } from "../gql/board/remove-board";
import { Board } from "../../../../models/board-workspace/board";

describe('BoardApiService', () => {
    let service: BoardApiService;
    let controller: ApolloTestingController;

    const testBoard: Board = {
        id: '1',
        name: 'test board'
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ApolloTestingModule],
            providers: [
                BoardApiService,
            ]
        });
        service = TestBed.inject(BoardApiService);
        controller = TestBed.inject(ApolloTestingController)
    });
    afterEach(() => {
        controller.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    it('test loadAllBoards', fakeAsync(() => {

        service.loadAllBoards()
            .pipe(take(1))
            .subscribe((res) => {
                expect(res).toEqual([ testBoard ])
            })
        const op = controller.expectOne(GET_ALL_BOARDS)
        op.flush({
            data: {
                getAllBoards: [
                    { ...testBoard, taskList: [] }
                ]
            }
        })
        flush()
    }))
    it('test addNewBoard', fakeAsync(() => {
        service.addNewBoard({ name: testBoard.name, description: testBoard.description }).subscribe((board) => {
            expect(board).toEqual(testBoard)
            expect(controller.expectOne(GET_ALL_BOARDS)).toBeDefined()
        })
        const op = controller.expectOne(CREATE_BOARD)
        op.flush({
            data: {
                createBoard: testBoard
            }
        })
        flush()
    }))
    it('test removeBoard', fakeAsync(() => {
        service.removeBoard(testBoard.id).subscribe((result) => {
            expect(result).toEqual(testBoard.id)
            expect(controller.expectOne(GET_ALL_BOARDS)).toBeDefined()
        })
        const op = controller.expectOne(REMOVE_BOARD)
        op.flush({
            data: {
                id: testBoard.id
            }
        })
        flush()
    }))
});
