import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambioUPageRoutingModule } from './cambio-u-routing.module';

import { CambioUPage } from './cambio-u.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambioUPageRoutingModule
  ],
  declarations: [CambioUPage]
})
export class CambioUPageModule {}
