import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElimforoPageRoutingModule } from './elimforo-routing.module';

import { ElimforoPage } from './elimforo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElimforoPageRoutingModule
  ],
  declarations: [ElimforoPage]
})
export class ElimforoPageModule {}
