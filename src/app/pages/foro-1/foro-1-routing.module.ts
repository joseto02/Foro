import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Foro1Page } from './foro-1.page';

const routes: Routes = [
  {
    path: '',
    component: Foro1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Foro1PageRoutingModule {}
