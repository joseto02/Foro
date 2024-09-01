import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Foro1PageRoutingModule } from './foro-1-routing.module';

import { Foro1Page } from './foro-1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Foro1PageRoutingModule
  ],
  declarations: [Foro1Page]
})
export class Foro1PageModule {}
