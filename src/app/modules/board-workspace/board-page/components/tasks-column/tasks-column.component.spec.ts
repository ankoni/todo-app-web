import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksColumnComponent } from './tasks-column.component';
import {TaskService} from "../../services/tasks/task.service";
import { provideMockStore } from "@ngrx/store/testing";
import { TaskList } from "../../../../../models/board-workspace/task-list";

describe('TaskListComponent', () => {
  let component: TasksColumnComponent;
  let fixture: ComponentFixture<TasksColumnComponent>;
  const initialState: TaskList[] = []

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ TaskService, provideMockStore({ initialState }) ],
      declarations: [ TasksColumnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
