import { Injectable } from '@angular/core';
import { TaskList } from "../../../../../models/board-workspace/task-list";
import { Store } from "@ngrx/store";
import { distinctUntilChanged, forkJoin, map, Observable } from "rxjs";
import {
    CreateTaskList, DeleteTaskList,
    EditTaskListData, GetOneTaskList,
    LoadTaskLists,
} from "../../../../../store/board-page/task-list/task-list.actions";
import { Task } from "../../../../../models/board-workspace/task";
import { getTaskLists } from "../../../../../store/board-page/task-list/task-list.selectors";
import {
    AddNewTaskInList,
    CreateTask,
    DeleteTaskAction,
    EditTaskInfoAction, GetAllTasksInList
} from "../../../../../store/board-page/task/task.actions";

/** Сервис для работы со списками задач и задачами */
@Injectable()
export class TaskService {

    constructor(
        private store: Store<{ taskList: TaskList[] }>
    ) {
    }

    /** Получить id всех списков задач */
    getAllTaskList(boardId: string): Observable<TaskList[]> {
        this.store.dispatch(new LoadTaskLists(boardId));
        return this.store.select(getTaskLists).pipe(distinctUntilChanged());
    }

    createTaskList(boardId: string, name: string): void {
        this.store.dispatch(new CreateTaskList(boardId, name));
    }

    editTaskList(listId: string, taskListData: Partial<TaskList>): void {
        this.store.dispatch(new EditTaskListData(listId, taskListData))
    }

    deleteList(listId: string): void {
        this.store.dispatch(new DeleteTaskList(listId))
    }

    /***
     * Получить информацию по id списка задач
     * @param listId id списка
     */
    getTaskListById(listId: string): Observable<TaskList | null> {
        return this.getListByIdFromStore(listId)
    }

    private getListByIdFromStore(listId: string): Observable<TaskList | null> {
        return this.store.select(getTaskLists)
            .pipe(
                map((taskLists: TaskList[]) =>
                    taskLists.find(it => it.id === listId) ?? null
                )
            );
    }

    /**
     * Добавить новую задачу (пустую) в список
     * @param listId id списка
     */
    addNewTaskInList(listId: string): void {
        this.store.dispatch(new AddNewTaskInList(listId))
    }

    /** Сохранить задачу */
    saveTask(listId: string, data: Partial<Task>): void {
        this.store.dispatch(new CreateTask(listId, data));
    }

    /***
     * Редактирование основной информации задачи
     * @param listId id списка
     * @param taskId id задачи
     * @param taskInfo основная изменяемая информация задачи
     */
    editTaskGeneralInfo(listId: string, taskId: string, taskInfo: Partial<Task>): void {
        this.store.dispatch(new EditTaskInfoAction(listId, taskId, taskInfo));
    }

    /**
     * Удалить задачу из списка
     * @param listId id списка
     * @param taskId id задачи
     */
    deleteTaskFromList(listId: string, taskId: string): void {
        this.store.dispatch(new DeleteTaskAction(listId, taskId));
    }
}
