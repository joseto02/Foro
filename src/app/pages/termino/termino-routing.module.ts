import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerminoPage } from './termino.page';

const routes: Routes = [
  {
    path: '',
    component: TerminoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerminoPageRoutingModule {}
