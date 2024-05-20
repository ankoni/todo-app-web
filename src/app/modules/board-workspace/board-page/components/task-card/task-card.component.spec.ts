import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardComponent } from './task-card.component';
import {TaskService} from "../../services/tasks/task.service";
import { provideMockStore } from "@ngrx/store/testing";
import { TaskList } from "../../../../../models/board-workspace/task-list";
import { NbCardModule, NbThemeModule } from "@nebular/theme";

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;
  const initialState: TaskList[] = []

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NbCardModule,
        NbThemeModule.forRoot({ name: 'default' }),
      ],
      providers: [ TaskService, provideMockStore({ initialState }) ],
      declarations: [ TaskCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
    component.taskData = { id: '1', name: 'test' }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
