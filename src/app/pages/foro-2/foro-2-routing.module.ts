import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Foro2Page } from './foro-2.page';

const routes: Routes = [
  {
    path: '',
    component: Foro2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Foro2PageRoutingModule {}
