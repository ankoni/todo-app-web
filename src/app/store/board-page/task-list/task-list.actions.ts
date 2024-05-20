import { Action, createAction, props } from "@ngrx/store";
import { TaskList } from "../../../models/board-workspace/task-list";

export const dummyAction = createAction('[dummy action]');

/** Загрузка списков задач */
const LOAD_ALL_TASK_LIST = '[Task List] Load data from api';
const LOAD_ALL_TASK_LIST_SUCCESS = '[Task List] Get data success';

export const loadTaskLists = createAction(LOAD_ALL_TASK_LIST, props<{ boardId: string }>());
export const loadTaskListsSuccess = createAction(LOAD_ALL_TASK_LIST_SUCCESS, props<{lists: TaskList[]}>());

/** Загрузка списков задач: запрос */
export class LoadTaskLists implements Action {
    type = LOAD_ALL_TASK_LIST;
    constructor(public boardId: string) {
    }
}
/** Загрузка списков задач: сохранение в стор */
export class LoadTaskListsSuccess implements Action {
    type = LOAD_ALL_TASK_LIST_SUCCESS;
    constructor(public lists: TaskList[]) {
    }
}


/** Запрос списка */
const GET_ONE_TASK_LIST = '[Task List] Get one task list'
const GET_ONE_TASK_LIST_SUCCESS = '[Task List] Get one task list success'
export const getOneTaskList = createAction(GET_ONE_TASK_LIST, props<{ id: string }>())
export const getOneTaskListSuccess = createAction(GET_ONE_TASK_LIST_SUCCESS, props<{ data: TaskList }>())

export class GetOneTaskList implements Action {
    type = GET_ONE_TASK_LIST
    constructor(public id: string) {
    }
}

export class GetOneTaskListSuccess implements Action {
    type = GET_ONE_TASK_LIST_SUCCESS
    constructor(public data: TaskList) {
    }
}

/** Добавление нового списка задач */
const CREATE_TASK_LIST = '[Task List] Add new task list';
const CREATE_TASK_LIST_SUCCESS = '[Task List] Task list added success';

export const createTaskList = createAction(
    CREATE_TASK_LIST,
    props<{ boardId: string, name: string }>()
);

export const createTaskListSuccess = createAction(
    CREATE_TASK_LIST_SUCCESS,
    props<{ taskList: TaskList }>()
);

export class CreateTaskList implements Action {
    type = CREATE_TASK_LIST;

    constructor(public boardId: string, public name: string) {
    }
}

export class CreateTaskListSuccess implements Action {
    type = CREATE_TASK_LIST_SUCCESS;

    constructor(public taskList: TaskList | undefined) {
    }
}

/** Изменение данных списка задач */
const EDIT_TASK_LIST_TYPE = '[TaskList] Edit task list data';
const EDIT_TASK_LIST_SUCCESS = '[Task List] Edit task list data success'

export const editTaskListData = createAction(EDIT_TASK_LIST_TYPE, props<{listId: string, data: Partial<TaskList>}>());
export const editTaskListSuccess = createAction(EDIT_TASK_LIST_TYPE, props<{listId: string, data: TaskList}>());

export class EditTaskListData implements Action {
    type = EDIT_TASK_LIST_TYPE;

    constructor(
        public listId: string,
        public data: Partial<TaskList>
    ) {
    }
}
export class EditTaskListSuccess implements Action {
    type = EDIT_TASK_LIST_SUCCESS;

    constructor(
        public listId: string,
        public data: TaskList
    ) {
    }
}

/** Удалить список */
const DELETE_TASK_LIST = '[Task List] Delete task list'
const DELETE_TASK_LIST_SUCCESS = '[Task List] Delete task list success'
export const deleteTaskList = createAction(DELETE_TASK_LIST, props<{ listId: string }>())
export const deleteTaskListSuccess = createAction(DELETE_TASK_LIST, props<{ listId: string }>())

export class DeleteTaskList implements Action {
    type = DELETE_TASK_LIST
    constructor(
        public listId: string,
    ) {
    }
}

export class DeleteTaskListSuccess implements Action {
    type = DELETE_TASK_LIST_SUCCESS
    constructor(
        public listId?: string,
    ) {
    }
}