import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CombiningPageRoutingModule } from './combining-routing.module';

import { CombiningPage } from './combining.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CombiningPageRoutingModule
  ],
  declarations: [CombiningPage]
})
export class CombiningPageModule {}
