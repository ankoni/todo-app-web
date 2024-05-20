import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBoardDialogComponent } from './create-board-dialog.component';
import {NbCardModule, NbDialogRef, NbIconModule, NbMenuService, NbStatusService} from "@nebular/theme";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {ReactiveFormsModule} from "@angular/forms";

describe('CreateBoardDialogComponent', () => {
  let component: CreateBoardDialogComponent;
  let fixture: ComponentFixture<CreateBoardDialogComponent>;
  let nbDialogSpy = jasmine.createSpyObj<NbDialogRef<CreateBoardDialogComponent>>('NbDialogRef', ['close'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        NbStatusService,
        NbMenuService,
          { provide: NbDialogRef, useValue: nbDialogSpy }
      ],
      imports: [ ReactiveFormsModule, NbCardModule, NbIconModule, NbEvaIconsModule ],
      declarations: [ CreateBoardDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBoardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
