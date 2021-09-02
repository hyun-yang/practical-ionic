import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConditionalPageRoutingModule } from './conditional-routing.module';

import { ConditionalPage } from './conditional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConditionalPageRoutingModule
  ],
  declarations: [ConditionalPage]
})
export class ConditionalPageModule {}
