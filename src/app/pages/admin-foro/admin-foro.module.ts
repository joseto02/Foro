import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminForoPageRoutingModule } from './admin-foro-routing.module';

import { AdminForoPage } from './admin-foro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminForoPageRoutingModule
  ],
  declarations: [AdminForoPage]
})
export class AdminForoPageModule {}
