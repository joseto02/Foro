import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Foro3Page } from './foro-3.page';

const routes: Routes = [
  {
    path: '',
    component: Foro3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Foro3PageRoutingModule {}
