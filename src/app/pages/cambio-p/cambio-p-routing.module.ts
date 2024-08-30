import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambioPPage } from './cambio-p.page';

const routes: Routes = [
  {
    path: '',
    component: CambioPPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambioPPageRoutingModule {}
