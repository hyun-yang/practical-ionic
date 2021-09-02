import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCoinPageRoutingModule } from './edit-coin-routing.module';

import { EditCoinPage } from './edit-coin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCoinPageRoutingModule
  ],
  declarations: [EditCoinPage]
})
export class EditCoinPageModule {}
