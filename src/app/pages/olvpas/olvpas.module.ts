import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OlvpasPageRoutingModule } from './olvpas-routing.module';

import { OlvpasPage } from './olvpas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OlvpasPageRoutingModule
  ],
  declarations: [OlvpasPage]
})
export class OlvpasPageModule {}
