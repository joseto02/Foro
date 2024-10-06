import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarContenidoPageRoutingModule } from './editar-contenido-routing.module';

import { EditarContenidoPage } from './editar-contenido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarContenidoPageRoutingModule
  ],
  declarations: [EditarContenidoPage]
})
export class EditarContenidoPageModule {}
