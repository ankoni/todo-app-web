import { createFeatureSelector, createSelector } from "@ngrx/store";
import { taskListAdapter, TaskListState } from "./task-list.state";

const getTaskListsState = createFeatureSelector<TaskListState>("taskList");
export const taskListSelectors = taskListAdapter.getSelectors();

export const getTaskLists = createSelector(getTaskListsState, taskListSelectors.selectAll);
