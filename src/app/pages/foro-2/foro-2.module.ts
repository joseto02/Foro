import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Foro2PageRoutingModule } from './foro-2-routing.module';

import { Foro2Page } from './foro-2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Foro2PageRoutingModule
  ],
  declarations: [Foro2Page]
})
export class Foro2PageModule {}
