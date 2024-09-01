import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Foro5Page } from './foro-5.page';

const routes: Routes = [
  {
    path: '',
    component: Foro5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Foro5PageRoutingModule {}
