import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearContenidoPageRoutingModule } from './crear-contenido-routing.module';

import { CrearContenidoPage } from './crear-contenido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearContenidoPageRoutingModule
  ],
  declarations: [CrearContenidoPage]
})
export class CrearContenidoPageModule {}
