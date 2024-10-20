import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModeradorPageRoutingModule } from './moderador-routing.module';

import { ModeradorPage } from './moderador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModeradorPageRoutingModule
  ],
  declarations: [ModeradorPage]
})
export class ModeradorPageModule {}
