import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskListDialogComponent } from './create-task-list-dialog.component';
import {NbCardModule, NbDialogRef, NbIconModule, NbMenuService, NbStatusService} from "@nebular/theme";
import {ReactiveFormsModule} from "@angular/forms";
import {NbEvaIconsModule} from "@nebular/eva-icons";

describe('CreateTaskListDialogComponent', () => {
  let component: CreateTaskListDialogComponent;
  let fixture: ComponentFixture<CreateTaskListDialogComponent>;
  let nbDialogSpy = jasmine.createSpyObj<NbDialogRef<CreateTaskListDialogComponent>>('NbDialogRef', ['close'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        NbStatusService,
        NbMenuService,
        { provide: NbDialogRef, useValue: nbDialogSpy }
      ],
      imports: [ ReactiveFormsModule, NbCardModule, NbIconModule, NbEvaIconsModule ],
      declarations: [ CreateTaskListDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTaskListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
