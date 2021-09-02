import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransformationPageRoutingModule } from './transformation-routing.module';

import { TransformationPage } from './transformation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransformationPageRoutingModule
  ],
  declarations: [TransformationPage]
})
export class TransformationPageModule {}
