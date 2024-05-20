import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, switchMap} from "rxjs";
import {Store} from "@ngrx/store";
import {TaskList} from "../../../models/board-workspace/task-list";
import {TaskApiService} from "../../../modules/board-workspace/board-page/services/tasks/task-api.service";
import {
    CreateTaskSuccess,
    deleteTaskFromList,
    DeleteTaskSuccess, editTaskInfo, EditTaskInfoSuccess,
    getAllTasksInList,
    GetAllTasksInListSuccess,
    saveTask
} from "./task.actions";
import {dummyAction} from "../task-list/task-list.actions";

@Injectable()
export class TaskEffects {
    constructor(
        private actions$: Actions,
        private store: Store<{ taskList: TaskList[] }>,
        private taskApiService: TaskApiService
    ) {
    }

    getTasks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getAllTasksInList),
            switchMap(({listId}) => {
                return this.taskApiService.getTasks(listId)
                    .pipe(
                        map((tasks) =>
                            tasks ? new GetAllTasksInListSuccess(listId, tasks) : dummyAction
                        )
                    )
            })
        )
    )

    /** Добавление новой задачи в список */
    addNewTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveTask),
            switchMap(({ listId, task: data }) => {
                return this.taskApiService.createTask(listId, data)
                    .pipe(
                        map((task) =>
                            task ? new CreateTaskSuccess(listId, task) : dummyAction
                        )
                    )
            })
        )
    )

    editTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(editTaskInfo),
            switchMap(({ listId, taskId, taskInfo}) => {
                return this.taskApiService.editTask(taskId, taskInfo).pipe(
                    map((task) =>
                        task ? new EditTaskInfoSuccess(listId, task) : dummyAction
                    )
                )
            })
        )
    )

    deleteTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTaskFromList),
            switchMap(({ listId, taskId }) => {
                return this.taskApiService.deleteTask(listId, taskId)
                    .pipe(map(({ listId, taskId }) =>
                        new DeleteTaskSuccess(listId, taskId)
                    ))
            })
        )
    )
}
