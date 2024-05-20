import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { TaskService } from "../services/tasks/task.service";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";
import { NbDialogService } from "@nebular/theme";
import { CreateTaskListDialogComponent } from "./dialogs/create-task-list-dialog/create-task-list-dialog.component";
import { CreateTaskListDialogData, TaskList } from "../../../../models/board-workspace/task-list";
import { BoardService } from "../../board-list-page/services/board.service";
import { Board } from "../../../../models/board-workspace/board";

@Component({
    selector: 'app-board-page',
    templateUrl: './board-page.component.html',
    styleUrls: ['./board-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardPageComponent implements OnInit, OnDestroy {
    private destroyed$: Subject<void> = new Subject<void>();
    private readonly boardId: string = '';

    boardInfo$: BehaviorSubject<Board | null> = new BehaviorSubject<Board | null>(null);
    taskLists$: Subject<TaskList[]> = new Subject<TaskList[]>();

    constructor(
        private taskService: TaskService,
        private boardService: BoardService,
        private route: ActivatedRoute,
        private router: Router,
        private dialogService: NbDialogService,
    ) {
        this.boardId = this.route.snapshot.paramMap.get('id') as string;
    }

    ngOnInit(): void {
        this.boardService.getOneBoard(this.boardId)
            .pipe(takeUntil(this.destroyed$))
            .subscribe((board: Board) => {
                this.boardInfo$.next(board)
                if (board.taskLists) {
                    this.taskLists$.next(board.taskLists)
                }
            })
    }

    addNewTaskList(): void {
        this.dialogService.open(CreateTaskListDialogComponent)
            .onClose
            .subscribe((data?: CreateTaskListDialogData) => {
                if (!data) {
                    return;
                }
                this.taskService.createTaskList(this.boardId, data.name);
            })
    }

    backToBoardList(): void {
        this.router.navigate(['/'])
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
