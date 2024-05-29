import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Board } from "../../../../../models/board-workspace/board";
import { Subject, takeUntil } from "rxjs";
import {
    NbButtonModule,
    NbCardModule,
    NbContextMenuDirective,
    NbContextMenuModule, NbIconModule,
    NbMenuItem,
    NbMenuService
} from "@nebular/theme";
import { Router } from "@angular/router";
import {BoardService} from "../../services/board.service";
import { CoreComponentsModule } from "../../../../../common/core-components.module";

@Component({
    selector: 'app-board-card',
    templateUrl: './board-card.component.html',
    styleUrls: ['./board-card.component.scss'],
    imports: [
        NbCardModule,
        CoreComponentsModule,
        NbButtonModule,
        NbContextMenuModule,
        NbIconModule
    ],
    standalone: true
})
export class BoardCardComponent implements OnInit, OnDestroy {
    private destroyed$ = new Subject<void>();
    @Input()
    board!: Board;

    // @ts-ignore
    @ViewChild(NbContextMenuDirective) contextMenu: NbContextMenuDirective;

    cardMenuItems: NbMenuItem[] = [
        { title: 'Delete', data: { onClick: () => this.deleteBoard() } }
    ]

    constructor(
        private nbMenuService: NbMenuService,
        private router: Router,
        private boardListService: BoardService,
    ) {
    }

    ngOnInit(): void {
        this.nbMenuService.onItemClick()
            .pipe(takeUntil(this.destroyed$))
            .subscribe(({ item }) => {
                item.data?.onClick?.();
            });
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
