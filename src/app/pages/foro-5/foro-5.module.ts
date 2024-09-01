import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Foro5PageRoutingModule } from './foro-5-routing.module';

import { Foro5Page } from './foro-5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Foro5PageRoutingModule
  ],
  declarations: [Foro5Page]
})
export class Foro5PageModule {}
