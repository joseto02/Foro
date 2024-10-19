import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstrenosPageRoutingModule } from './estrenos-routing.module';

import { EstrenosPage } from './estrenos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstrenosPageRoutingModule
  ],
  declarations: [EstrenosPage]
})
export class EstrenosPageModule {}
