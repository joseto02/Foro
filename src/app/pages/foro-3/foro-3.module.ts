import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Foro3PageRoutingModule } from './foro-3-routing.module';

import { Foro3Page } from './foro-3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Foro3PageRoutingModule
  ],
  declarations: [Foro3Page]
})
export class Foro3PageModule {}
