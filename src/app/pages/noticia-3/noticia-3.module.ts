import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Noticia3PageRoutingModule } from './noticia-3-routing.module';

import { Noticia3Page } from './noticia-3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Noticia3PageRoutingModule
  ],
  declarations: [Noticia3Page]
})
export class Noticia3PageModule {}
