import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearContenidoPage } from './crear-contenido.page';

const routes: Routes = [
  {
    path: '',
    component: CrearContenidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearContenidoPageRoutingModule {}
