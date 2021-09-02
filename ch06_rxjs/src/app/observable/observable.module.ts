import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObservablePageRoutingModule } from './observable-routing.module';

import { ObservablePage } from './observable.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObservablePageRoutingModule
  ],
  declarations: [ObservablePage]
})
export class ObservablePageModule {}
