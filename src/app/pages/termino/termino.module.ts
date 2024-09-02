import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TerminoPageRoutingModule } from './termino-routing.module';

import { TerminoPage } from './termino.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TerminoPageRoutingModule
  ],
  declarations: [TerminoPage]
})
export class TerminoPageModule {}
