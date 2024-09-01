import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Foro4PageRoutingModule } from './foro-4-routing.module';

import { Foro4Page } from './foro-4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Foro4PageRoutingModule
  ],
  declarations: [Foro4Page]
})
export class Foro4PageModule {}
