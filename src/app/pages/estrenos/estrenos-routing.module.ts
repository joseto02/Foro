import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstrenosPage } from './estrenos.page';

const routes: Routes = [
  {
    path: '',
    component: EstrenosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstrenosPageRoutingModule {}
