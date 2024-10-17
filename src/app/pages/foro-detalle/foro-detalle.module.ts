import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForoDetallePageRoutingModule } from './foro-detalle-routing.module';

import { ForoDetallePage } from './foro-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForoDetallePageRoutingModule
  ],
  declarations: [ForoDetallePage]
})
export class ForoDetallePageModule {}
