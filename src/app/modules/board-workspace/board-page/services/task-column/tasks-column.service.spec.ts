import { TestBed } from '@angular/core/testing';

import { TasksColumnService } from './tasks-column.service';
import {ApolloTestingModule} from "apollo-angular/testing";

describe('TasksColumnService', () => {
  let service: TasksColumnService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ApolloTestingModule ],
      providers: [ TasksColumnService ]
    });
    service = TestBed.inject(TasksColumnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
