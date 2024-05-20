import {Action, createAction, props} from "@ngrx/store";
import { Task } from "../../../models/board-workspace/task";

/** Добавление пустой задачи в список */
const ADD_NEW_TASK_IN_LIST = '[Task] Add task in list'

export const addNewTaskInList = createAction(ADD_NEW_TASK_IN_LIST, props<{ listId: string }>())

export class AddNewTaskInList implements Action {
    type = ADD_NEW_TASK_IN_LIST
    constructor(public listId: string) {
    }
}

/** Сохранение новой задачи в списке */
const SAVE_TASK_TYPE = '[Task] Save new task';
const SAVE_TASK_SUCCESS = '[Task] Save new task success';

/** Добавление задачи в список: отправка на бэк */
export const saveTask = createAction(SAVE_TASK_TYPE, props<{ listId: string, task: Partial<Task> }>());
export const saveTaskSuccess = createAction(SAVE_TASK_SUCCESS, props<{ listId: string, task: Task }>());

export class CreateTask implements Action {
    type = SAVE_TASK_TYPE;

    constructor(public listId: string, public task: Partial<Task>) {
        console.log({ task })
    }
}

/** Сохранение задачи в список: обновление в сторе */
export class CreateTaskSuccess implements Action {
    type = SAVE_TASK_SUCCESS;

    constructor(
        public listId: string,
        public task: Task
    ) {
    }
}

/** Получить все задачи в списке */
const GET_ALL_TASKS_IN_LIST = '[Task] Get all tasks in list'
const GET_ALL_TASKS_IN_LIST_SUCCESS = '[Task] Get all tasks in list success'

export const getAllTasksInList = createAction(GET_ALL_TASKS_IN_LIST, props<{ listId: string }>())
export const getAllTasksInListSuccess = createAction(GET_ALL_TASKS_IN_LIST_SUCCESS, props<{ listId: string, data: Task[] }>())

export class GetAllTasksInList implements Action {
    type = GET_ALL_TASKS_IN_LIST
    constructor(public listId: string) {
    }
}

export class GetAllTasksInListSuccess implements Action {
    type = GET_ALL_TASKS_IN_LIST_SUCCESS
    constructor(public listId: string, public data: Task[]) {
    }
}

/** Редактирование основных данных по задаче */
const EDIT_TASK = '[Task] Edit task';
const EDIT_TASK_SUCCESS = '[Task] Edit task success'

export const editTaskInfo = createAction(EDIT_TASK, props<{listId: string, taskId: string, taskInfo: Partial<Task>}>());
export const editTaskInfoSuccess = createAction(EDIT_TASK_SUCCESS, props<{ listId: string, task: Task }>());

export class EditTaskInfoAction implements Action {
    type = EDIT_TASK;

    constructor(
        public listId: string,
        public taskId: string,
        public taskInfo: Partial<Task>
    ) {
    }
}

export class EditTaskInfoSuccess implements Action {
    type = EDIT_TASK_SUCCESS;

    constructor(
        public listId: string,
        public task: Task
    ) {
    }
}

/** Удаление задачи из списка */
const DELETE_TASK_FROM_LIST_TYPE = '[Task List API] Delete task';
const DELETE_TASK_SUCCESS = '[Task List] Delete task success';

export const deleteTaskFromList = createAction(DELETE_TASK_FROM_LIST_TYPE, props<{listId: string, taskId: string}>());
export const deleteTaskSuccess = createAction(DELETE_TASK_SUCCESS, props<{listId: string, taskId: string}>());

export class DeleteTaskAction implements Action {
    type = DELETE_TASK_FROM_LIST_TYPE;

    constructor(
        public listId: string,
        public taskId: string
    ) {
    }
}

export class DeleteTaskSuccess implements Action {
    type = DELETE_TASK_SUCCESS;

    constructor(
        public listId: string,
        public taskId: string
    ) {
    }
}
