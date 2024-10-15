import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminForoPage } from './admin-foro.page';

const routes: Routes = [
  {
    path: '',
    component: AdminForoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminForoPageRoutingModule {}
