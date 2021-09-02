import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MeetupDetailPageRoutingModule} from './meetup-detail-routing.module';

import {MeetupDetailPage} from './meetup-detail.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		MeetupDetailPageRoutingModule,
		TranslateModule
	],
	declarations: [MeetupDetailPage]
})
export class MeetupDetailPageModule {
}
