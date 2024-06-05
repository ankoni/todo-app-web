import {createReducer, on} from "@ngrx/store";
import {
    addNewTaskInList,
    deleteTaskSuccess,
    editTaskInfoSuccess,
    getAllTasksInListSuccess,
    saveTaskSuccess
} from "../task/task.actions";
import {
    createTaskListSuccess,
    deleteTaskListSuccess, editTaskListSuccess,
    getOneTaskList,
    getOneTaskListSuccess,
    loadTaskListsSuccess
} from "./task-list.actions";
import {initialState, taskListAdapter} from "./task-list.state";

// @ts-ignore
export const taskListReducer = createReducer(
    initialState,
    /** Task list actions */
    on(loadTaskListsSuccess, (state, { lists }) => {
        console.log(lists)
        return taskListAdapter.setAll(lists, state);
    }),
    on(getOneTaskListSuccess, (state, action) => {
        const list = action.data
        return taskListAdapter.updateOne({id: list.id, changes: {...list}}, state)
    }),

    on(getAllTasksInListSuccess, (state, {listId, data}) => {
        return taskListAdapter.updateOne({id: listId, changes: {tasks: data}}, state)
    }),
    on(createTaskListSuccess, (state, action) => {
        console.log(action)
        return action.taskList ? taskListAdapter.addOne(action.taskList, state) : state;
    }),
    on(editTaskListSuccess, (state, { listId, data}) => {
       return taskListAdapter.updateOne({ id: listId, changes: {...data }}, state)
    }),
    on(deleteTaskListSuccess, (state, { listId }) => {
        return listId ? taskListAdapter.removeOne(listId, state) : state
    }),

    on(addNewTaskInList, (state, {listId}) => {
        const list = state.entities[listId];
        console.log(list)
        if (!list) {
            return state;
        }
        return taskListAdapter.updateOne(
            {id: listId, changes: {tasks: [...list.tasks, {id: '', name: '', isNew: true}]}},
            state
        )
    }),
    /** Task actions */
    on(saveTaskSuccess, (state, {listId, task}) => {
        const list = state.entities[listId];
        if (!list) {
            return state;
        }
        return taskListAdapter.updateOne({
            id: listId,
            changes: {
                tasks: [
                    ...list.tasks.filter(currentTask => !currentTask.isNew),
                    task
                ]
            }
        }, state)
    }),
    on(editTaskInfoSuccess, (state, {listId, task}) => {
        const list = state.entities[listId];
        if (!list) {
            return state;
        }
        return taskListAdapter.updateOne(
            {
                id: listId,
                changes: {
                    tasks: list.tasks.map(oldTask => oldTask.id === task.id ? task : oldTask)
                }
            },
            state
        )
    }),
    on(deleteTaskSuccess, (state, {listId, taskId}) => {
        const list = state.entities[listId];
        if (!list) {
            return state;
        }
        return taskListAdapter.updateOne(
            {
                id: listId,
                changes: {tasks: list.tasks.filter(task => task.id !== taskId)}
            }, state
        );
    })
);
