import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { TaskService } from "../services/tasks/task.service";
import { BehaviorSubject, Subject, switchMap, take, takeUntil, tap } from "rxjs";
import { CreateTaskListDialogComponent } from "./dialogs/create-task-list-dialog/create-task-list-dialog.component";
import { TaskList } from "../../../../models/board-workspace/task-list";
import { BoardService } from "../../board-list-page/services/board.service";
import { Board } from "../../../../models/board-workspace/board";
import { TuiDialogService } from "@taiga-ui/core";
import { PolymorpheusComponent } from "@tinkoff/ng-polymorpheus";

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
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
    ) {
        this.boardId = this.route.snapshot.paramMap.get('id') as string;
    }

    ngOnInit(): void {
        this.boardService.getOneBoard(this.boardId)
            .pipe(
                take(1),
                tap((board: Board) => {
                    this.boardInfo$.next(board)
                }),
                switchMap((board: Board) => {
                    return this.taskService.getAllTaskList(board.id)
                }),
                takeUntil(this.destroyed$)
            )
            .subscribe((taskList: TaskList[]) => {
                if (taskList) {
                    this.taskLists$.next(taskList)
                }
            })

    }

    addNewTaskList(): void {
        this.dialogs.open<TaskList>(new PolymorpheusComponent(CreateTaskListDialogComponent),
            { label: 'Create task list' }
        )
            .subscribe((data: TaskList) => {
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
