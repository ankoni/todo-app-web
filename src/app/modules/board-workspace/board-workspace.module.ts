import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
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
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./board-list-page/components/board-list.component').then(m => m.BoardListComponent)
    },
    {
        path: ':id',
        loadChildren: () => import('./board-page/board-page.module').then(m => m.BoardPageModule)
    },
]

@NgModule({
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
