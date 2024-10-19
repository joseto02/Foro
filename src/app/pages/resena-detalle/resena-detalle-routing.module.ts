import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResenaDetallePage } from './resena-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: ResenaDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResenaDetallePageRoutingModule {}
