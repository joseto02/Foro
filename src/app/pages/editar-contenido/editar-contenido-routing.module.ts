import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarContenidoPage } from './editar-contenido.page';

const routes: Routes = [
  {
    path: '',
    component: EditarContenidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarContenidoPageRoutingModule {}
