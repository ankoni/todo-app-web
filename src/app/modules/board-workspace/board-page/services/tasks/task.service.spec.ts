import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import {provideMockStore} from "@ngrx/store/testing";
import {TaskList} from "../../../../../models/board-workspace/task-list";

describe('TaskService', () => {
  let service: TaskService;
  const initialState: TaskList[] = []

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          TaskService,
          provideMockStore({ initialState })
      ]
    });
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
