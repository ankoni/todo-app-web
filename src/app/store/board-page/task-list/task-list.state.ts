import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { TaskList } from "../../../models/board-workspace/task-list";

export interface TaskListState extends EntityState<TaskList> {
}

export const taskListAdapter = createEntityAdapter<TaskList>();
export const initialState: TaskListState = taskListAdapter.getInitialState();
