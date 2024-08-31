import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambioUPage } from './cambio-u.page';

const routes: Routes = [
  {
    path: '',
    component: CambioUPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambioUPageRoutingModule {}
