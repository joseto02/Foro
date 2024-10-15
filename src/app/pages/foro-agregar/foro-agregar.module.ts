import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForoAgregarPageRoutingModule } from './foro-agregar-routing.module';

import { ForoAgregarPage } from './foro-agregar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForoAgregarPageRoutingModule
  ],
  declarations: [ForoAgregarPage]
})
export class ForoAgregarPageModule {}
