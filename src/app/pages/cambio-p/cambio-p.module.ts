import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambioPPageRoutingModule } from './cambio-p-routing.module';

import { CambioPPage } from './cambio-p.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambioPPageRoutingModule
  ],
  declarations: [CambioPPage]
})
export class CambioPPageModule {}
