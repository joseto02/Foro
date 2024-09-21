import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BaneoPageRoutingModule } from './baneo-routing.module';

import { BaneoPage } from './baneo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BaneoPageRoutingModule
  ],
  declarations: [BaneoPage]
})
export class BaneoPageModule {}
