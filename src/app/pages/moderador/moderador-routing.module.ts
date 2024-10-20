import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModeradorPage } from './moderador.page';

const routes: Routes = [
  {
    path: '',
    component: ModeradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModeradorPageRoutingModule {}
