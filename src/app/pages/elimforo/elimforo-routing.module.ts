import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElimforoPage } from './elimforo.page';

const routes: Routes = [
  {
    path: '',
    component: ElimforoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElimforoPageRoutingModule {}
