import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {Task} from "../../../../../models/board-workspace/task";
import {Apollo} from "apollo-angular";
import {CREATE_TASK, ICREATE_TASK} from "../../gql/task/create-task";
import {DELETE_TASK, IDELETE_TASK} from "../../gql/task/delete-task";
import {GET_ALL_TASKS, IGET_ALL_TASKS} from "../../gql/task/get-all-tasks";
import {EDIT_TASK, IEDIT_TASK} from "../../gql/task/edit-task";

@Injectable()
export class TaskApiService {

    constructor(
        private readonly apollo: Apollo,
    ) {
    }

    getTasks(listId: string): Observable<Task[]> {
        return this.apollo
            .watchQuery<IGET_ALL_TASKS>({
                query: GET_ALL_TASKS,
                variables: {
                    listId
                }
            })
            .valueChanges
            .pipe(map(({data}) => data.getAllTask))
    }

    /** Добавление новой задачи в список */
    createTask(listId: string, data: Partial<Task>): Observable<Task | undefined> {
        return this.apollo
            .mutate<ICREATE_TASK>({
                mutation: CREATE_TASK,
                variables: {
                    createTask: {
                        taskListId: listId,
                        ...data
                    }
                },
                refetchQueries: ['getAllTaskList']
            })
            .pipe(
                map(({data}) => data?.createTask)
            )
    }

    editTask(id: string, editedData: Partial<Task>): Observable<Task | undefined> {
        return this.apollo
            .mutate<IEDIT_TASK>({
                mutation: EDIT_TASK,
                variables: {
                    updateTask: {
                        id,
                        ...editedData
                    }
                }
            })
            .pipe(
                map(({ data }) => data?.updateTask)
            )
    }

    /** Удаление задачи из списка */
    deleteTask(listId: string, taskId: string): Observable<{ listId: string, taskId: string }> {
        return this.apollo.mutate<IDELETE_TASK>({
            mutation: DELETE_TASK,
            variables: {
                id: taskId
            },
            refetchQueries: ['getAllTaskList']
        })
            .pipe(
                map(({data}) =>
                    ({listId: listId, taskId: data?.deleteTask ?? taskId})
                )
            )
    }

}
