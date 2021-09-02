import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {AddCoinPageRoutingModule} from './add-coin-routing.module';
import {AddCoinPage} from './add-coin.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		AddCoinPageRoutingModule,
		ReactiveFormsModule
	],
	declarations: [AddCoinPage]
})
export class AddCoinPageModule {
}
