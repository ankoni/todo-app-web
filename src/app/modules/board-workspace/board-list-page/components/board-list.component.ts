import { Component, OnInit } from '@angular/core';
import { BoardService } from "../services/board.service";
import { Observable } from "rxjs";
import { Board, CreateBoardDialogData } from "../../../../models/board-workspace/board";
import { NbDialogService } from "@nebular/theme";
import { CreateBoardDialogComponent } from "./dialogs/create-board-dialog/create-board-dialog.component";

@Component({
  selector: 'app-board-list-page',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit {
  boardList$: Observable<Board[]> = this.boardService.getAllBoards()

  constructor(
      private boardService: BoardService,
      private dialogService: NbDialogService,
  ) {
  }

  ngOnInit() {
  }

  addNewBoard(): void {
    this.dialogService
        .open(CreateBoardDialogComponent, {}).onClose
        .subscribe((formData?: CreateBoardDialogData) => {
          if (!formData) {
            return;
          }
          this.boardService.addNewBoard(formData);
        })
  }
}
