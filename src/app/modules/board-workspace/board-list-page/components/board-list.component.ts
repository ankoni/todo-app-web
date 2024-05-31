import { Component, Inject, OnInit } from '@angular/core';
import { BoardService } from "../services/board.service";
import { Observable } from "rxjs";
import { Board, CreateBoardDialogData } from "../../../../models/board-workspace/board";
import { NbButtonModule, NbDialogService, NbLayoutModule } from "@nebular/theme";
import { CreateBoardDialogComponent } from "./dialogs/create-board-dialog/create-board-dialog.component";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { BoardCardComponent } from "./board-card/board-card.component";
import { TuiIslandModule } from "@taiga-ui/kit";
import { TuiButtonModule, TuiDialogService } from "@taiga-ui/core";
import { PolymorpheusComponent } from "@tinkoff/ng-polymorpheus";

@Component({
    selector: 'app-board-list-page',
    templateUrl: './board-list.component.html',
    styleUrls: ['./board-list.component.scss'],
    imports: [
        NgForOf,
        AsyncPipe,
        NgIf,
        BoardCardComponent,
        TuiIslandModule,
        TuiButtonModule
    ],
    standalone: true
})
export class BoardListComponent implements OnInit {
    boardList$: Observable<Board[]> = this.boardService.getAllBoards()

    constructor(
        private boardService: BoardService,
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
    ) {
    }

    ngOnInit() {
    }

    addNewBoard(): void {
        this.dialogs.open<CreateBoardDialogData>(new PolymorpheusComponent(CreateBoardDialogComponent), {
            label: 'Create board'
        })
            .subscribe((formData?: CreateBoardDialogData) => {
                if (!formData) {
                    return;
                }
                this.boardService.addNewBoard(formData);
            })
    }
}
