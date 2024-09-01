import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Foro4Page } from './foro-4.page';

const routes: Routes = [
  {
    path: '',
    component: Foro4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Foro4PageRoutingModule {}
