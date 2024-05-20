import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardPageComponent } from './board-page.component';
import { TaskService } from "../services/tasks/task.service";
import { provideMockStore } from "@ngrx/store/testing";
import { TaskList } from "../../../../models/board-workspace/task-list";
import { RouterTestingModule } from "@angular/router/testing";
import { NbDialogService, NbLayoutModule, NbThemeModule, NbThemeService } from "@nebular/theme";
import createSpyObj = jasmine.createSpyObj;

describe('BoardPageComponent', () => {
    let component: BoardPageComponent;
    let fixture: ComponentFixture<BoardPageComponent>;
    const initialState: TaskList[] = []
    const mockDialogService = createSpyObj('NbDialogService', ['open'])

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, NbLayoutModule, NbThemeModule.forRoot({ name: 'default' })],
            providers: [
                TaskService,
                provideMockStore({ initialState }),
                { provide: NbDialogService, useValue: mockDialogService },
                NbThemeService
            ],
            declarations: [BoardPageComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(BoardPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
