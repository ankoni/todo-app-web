import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
    createTaskList, CreateTaskListSuccess, deleteTaskList, DeleteTaskListSuccess,
    dummyAction, editTaskListData, EditTaskListSuccess, getOneTaskList, GetOneTaskListSuccess,
    loadTaskLists,
    LoadTaskListsSuccess
} from "./task-list.actions";
import {map, mergeMap, of, switchMap, take, tap, withLatestFrom} from "rxjs";
import { Store } from "@ngrx/store";
import { TaskList } from "../../../models/board-workspace/task-list";
import { TaskApiService } from "../../../modules/board-workspace/board-page/services/tasks/task-api.service";
import {CreateTaskSuccess, deleteTaskFromList, DeleteTaskSuccess, saveTask} from "../task/task.actions";
import {TasksColumnService} from "../../../modules/board-workspace/board-page/services/task-column/tasks-column.service";
import { Board } from "../../../models/board-workspace/board";

@Injectable()
export class TaskListEffects {
    constructor(
        private actions$: Actions,
        private store: Store<{ taskList: TaskList[] }>,
        private taskListService: TasksColumnService,
    ) {
    }

    /** Загрузка списков задач с бэка в стор */
    loadLists$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(loadTaskLists),
                withLatestFrom(this.store.select("taskList")),
                mergeMap(([action, lists]) => {
                    if (!lists.length) {
                        return this.taskListService.loadAllTaskListData(action.boardId)
                            .pipe(
                                map((data: TaskList[]) =>
                                    new LoadTaskListsSuccess(data)
                                )
                            )
                    }
                    return of(dummyAction());
                }),
            )
    );

    /** Создание нового списка задач на доске */
    createTaskList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createTaskList),
            switchMap(({ boardId, name}) => {
                return this.taskListService.createTaskList(boardId, name)
                    .pipe(
                        map((taskList) =>
                            new CreateTaskListSuccess(taskList)
                        )
                    )
            })
        )
    )

    /** Редактирование данных списка */
    editList$ = createEffect(() => this.actions$.pipe(
        ofType(editTaskListData),
        switchMap(({ listId, data }) =>
            this.taskListService.editTaskList(listId, data)
                .pipe(
                    map((taskList: TaskList | undefined) => {
                        return taskList ? new EditTaskListSuccess(listId, taskList) : dummyAction()
                    })
                )
        ),
    ))

    /** Удаление списка */
    deleteList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTaskList),
            switchMap(({listId}) =>
                this.taskListService.deleteTaskList(listId)
                    .pipe(
                        map((listId) =>
                            new DeleteTaskListSuccess(listId)
                        )
                    )
            )
        )
    )

    /** Информация о списке */
    getOneList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getOneTaskList),
            switchMap(({ id }) => {
                return this.taskListService.getOneTaskList(id)
                    .pipe(
                        map((taskList) => new GetOneTaskListSuccess(taskList))
                    )
            })
        )
    )
}
