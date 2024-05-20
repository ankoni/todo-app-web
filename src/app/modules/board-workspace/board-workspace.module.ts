import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { BoardListComponent } from './board-list-page/components/board-list.component';
import { provideStore, StoreModule } from "@ngrx/store";
import { boardListReducer } from "../../store/board-list/board-list.reducer";
import { EffectsModule } from "@ngrx/effects";
import { BoardListEffects } from "../../store/board-list/board-list.effects";
import { BoardService } from "./board-list-page/services/board.service";
import { BoardApiService } from "./board-list-page/services/board-api.service";
import {
    NbButtonModule,
    NbCardModule,
    NbContextMenuModule,
    NbDialogModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule,
    NbMenuService
} from "@nebular/theme";
import {
    CreateBoardDialogComponent
} from './board-list-page/components/dialogs/create-board-dialog/create-board-dialog.component';
import { ReactiveFormsModule } from "@angular/forms";
import { BoardCardComponent } from './board-list-page/components/board-card/board-card.component';
import {
    CreateTaskListDialogComponent
} from './board-page/components/dialogs/create-task-list-dialog/create-task-list-dialog.component';

const routes: Routes = [
    {
        path: '',
        component: BoardListComponent
    },
    {
        path: ':id',
        loadChildren: () => import('./board-page/board-page.module').then(m => m.BoardPageModule)
    }
]

@NgModule({
    declarations: [
        BoardListComponent,
        CreateBoardDialogComponent,
        BoardCardComponent,
        CreateTaskListDialogComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('boardList', boardListReducer),
        EffectsModule.forFeature([BoardListEffects]),
        NbDialogModule.forChild(),
        NbButtonModule,
        ReactiveFormsModule,
        NbLayoutModule,
        NbCardModule,
        NbInputModule,
        NbIconModule,
        NbContextMenuModule,
    ],
    providers: [
        BoardService,
        BoardApiService,
        NbMenuService,
    ]
})
export class BoardWorkspaceModule {
}
