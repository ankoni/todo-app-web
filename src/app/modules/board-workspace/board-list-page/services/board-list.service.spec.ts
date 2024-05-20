import { fakeAsync, flush, TestBed } from '@angular/core/testing';

import { BoardService } from "./board.service";
import { Board } from "../../../../models/board-workspace/board";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { getBoardList } from "../../../../store/board-list/board-list.selectors";

describe('BoardListService', () => {
    let service: BoardService;
    let store: MockStore
    const initialState: Board[] = [ { id: '1', name: 'test' }]

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                BoardService,
                provideMockStore({
                    initialState,
                    selectors: [
                        {
                            selector: getBoardList,
                            value: []
                        }
                    ]
                })
            ]
        });
        store = TestBed.inject(MockStore)
        service = TestBed.inject(BoardService);
    });

    afterEach(() => {
        store?.resetSelectors();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('test getAllBoards', fakeAsync(() => {
        // store.overrideSelector(getBoardList, [ { id: '1', name: 'test' } ])
        service.getAllBoards().subscribe((result) => {
            expect(result).toEqual([])
        })
        flush()
    }))
});
