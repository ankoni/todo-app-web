import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCardComponent } from './board-card.component';
import {
    NbCardModule,
    NbContextMenuModule,
    NbIconModule,
    NbMenuService, NbThemeModule
} from "@nebular/theme";
import { BoardService } from "../../services/board.service";
import { Board } from "../../../../../models/board-workspace/board";
import { provideMockStore } from "@ngrx/store/testing";
import { NbEvaIconsModule } from "@nebular/eva-icons";

describe('BoardCardComponent', () => {
    let component: BoardCardComponent;
    let fixture: ComponentFixture<BoardCardComponent>;
    const initialState: Board[] = []

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NbCardModule,
                NbThemeModule.forRoot({ name: 'default' }),
                NbEvaIconsModule,
                NbIconModule,
                NbContextMenuModule
            ],
            providers: [
                BoardService,
                provideMockStore({ initialState }),
                NbMenuService,
            ],
            declarations: [BoardCardComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(BoardCardComponent);
        component = fixture.componentInstance;
        component.board = { id: '1', name: 'test' }
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
