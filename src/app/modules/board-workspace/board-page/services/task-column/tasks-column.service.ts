import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import { catchError, map, Observable, of } from "rxjs";
import { TaskList } from "../../../../../models/board-workspace/task-list";
import { GET_ONE_TASK_LIST, IGET_ONE_TASK_LIST } from "../../gql/task-list/get-one-task-list";
import { CREATE_TASK_LIST, ICREATE_TASK_LIST } from "../../gql/task-list/create-task-list";
import { DELETE_TASK_LIST, IDELETE_TASK_LIST } from "../../gql/task-list/delete-task-list";
import { EDIT_TASK_LIST, IEDIT_TASK_LIST } from "../../gql/task-list/edit-task-list";
import { GET_ALL_TASK_LIST, IGET_ALL_TASK_LIST } from "../../gql/task-list/get-all-task-list";

@Injectable({
    providedIn: 'root'
})
export class TasksColumnService {

    constructor(
        private readonly apollo: Apollo,
    ) {
    }

    /** Запрос на получение списков с задачами */
    loadAllTaskListData(boardId: string): Observable<TaskList[]> {
        return this.apollo
            .query<IGET_ALL_TASK_LIST>({query: GET_ALL_TASK_LIST, variables: {boardId}})
            .pipe(
                map(({data}) => data.getAllTaskList),
                catchError(() => {
                    return of([])
                })
            )
    }

    getOneTaskList(listId: string): Observable<TaskList> {
        return this.apollo
            .query<IGET_ONE_TASK_LIST>({
                query: GET_ONE_TASK_LIST,
                variables: {id: listId}
            })
            .pipe(
                map(({data}) => data?.getOneTaskList)
            )
    }

    /**
     * Создание списка задач на доске
     * @param boardId id доски
     * @param name название списка
     */
    createTaskList(boardId: string, name: string): Observable<TaskList | undefined> {
        return this.apollo
            .mutate<ICREATE_TASK_LIST>({
                mutation: CREATE_TASK_LIST,
                variables: {
                    createTaskList: {
                        boardId,
                        name
                    }
                },
            })
            .pipe(
                map(({data}) => data?.createTaskList)
            )
    }

    editTaskList(listId: string, data: Partial<TaskList>): Observable<TaskList | undefined> {
        return this.apollo
            .mutate<IEDIT_TASK_LIST>({
                mutation: EDIT_TASK_LIST,
                variables: {
                    updateTaskList: {
                        id: listId,
                        name: data.name
                    }
                }
            })
            .pipe(
                map(({ data }) => data?.updateTaskList)
            )
    }

    deleteTaskList(listId: string): Observable<string | undefined> {
        return this.apollo
            .mutate<IDELETE_TASK_LIST>({
                mutation: DELETE_TASK_LIST,
                variables: { id: listId }
            }).pipe(map(({data}) => data?.removeTaskList))
    }
}
