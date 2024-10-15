import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForoAgregarPage } from './foro-agregar.page';

const routes: Routes = [
  {
    path: '',
    component: ForoAgregarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForoAgregarPageRoutingModule {}
