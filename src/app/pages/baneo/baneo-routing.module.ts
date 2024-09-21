import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaneoPage } from './baneo.page';

const routes: Routes = [
  {
    path: '',
    component: BaneoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaneoPageRoutingModule {}
