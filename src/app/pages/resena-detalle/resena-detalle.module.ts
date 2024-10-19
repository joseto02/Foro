import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResenaDetallePageRoutingModule } from './resena-detalle-routing.module';

import { ResenaDetallePage } from './resena-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResenaDetallePageRoutingModule
  ],
  declarations: [ResenaDetallePage]
})
export class ResenaDetallePageModule {}
