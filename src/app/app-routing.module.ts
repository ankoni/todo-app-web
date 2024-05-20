import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'boards',
    loadChildren: () => import('./modules/board-workspace/board-workspace.module').then(m => m.BoardWorkspaceModule)
  },
  {
    path: '',
    redirectTo: 'boards',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
