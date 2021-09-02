import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewMeetUpPageRoutingModule } from './new-meet-up-routing.module';

import { NewMeetUpPage } from './new-meet-up.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewMeetUpPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [NewMeetUpPage]
})
export class NewMeetUpPageModule {}
