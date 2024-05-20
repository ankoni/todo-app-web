import { TestBed } from '@angular/core/testing';

import { TaskApiService } from './task-api.service';
import {ApolloTestingModule} from "apollo-angular/testing";

describe('TaskApiService', () => {
  let service: TaskApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ApolloTestingModule ],
      providers: [ TaskApiService ]
    });
    service = TestBed.inject(TaskApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
