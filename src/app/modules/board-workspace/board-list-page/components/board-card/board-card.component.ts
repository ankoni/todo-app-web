import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Board } from "../../../../../models/board-workspace/board";
import { Subject, takeUntil } from "rxjs";
import { Router } from "@angular/router";
import { BoardService } from "../../services/board.service";
import { CoreComponentsModule } from "../../../../../common/core-components.module";
import { TuiIslandModule } from "@taiga-ui/kit";
import { TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule } from "@taiga-ui/core";
import { NgForOf } from "@angular/common";

@Component({
    selector: 'app-board-card',
    templateUrl: './board-card.component.html',
    styleUrls: ['./board-card.component.scss'],
    imports: [
        CoreComponentsModule,
        TuiIslandModule,
        TuiButtonModule,
        TuiHostedDropdownModule,
        TuiDataListModule,
        NgForOf
    ],
    standalone: true
})
export class BoardCardComponent implements OnInit, OnDestroy {
    private destroyed$ = new Subject<void>();
    @Input()
    board!: Board;

    // @ts-ignore
    @ViewChild(NbContextMenuDirective) contextMenu: NbContextMenuDirective;

    cardMenuItems: { title: string, data: { onClick: () => void } }[] = [
        { title: 'Delete', data: { onClick: () => this.deleteBoard() } }
    ]

    constructor(
        private router: Router,
        private boardListService: BoardService,
    ) {
    }

    ngOnInit(): void {
    }

    toggleMenu(): void {
        this.contextMenu?.toggle();
    }

    navigateToBoard(): void {
        const boardId = this.board.id;
        if (boardId) {
            this.router.navigate([`/boards/${boardId}`])
        }
    }

    deleteBoard(): void {
        console.log('delete Board func')
        this.boardListService.removeBoard(this.board.id);
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
