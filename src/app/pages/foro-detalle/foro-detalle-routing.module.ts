import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForoDetallePage } from './foro-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: ForoDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForoDetallePageRoutingModule {}
