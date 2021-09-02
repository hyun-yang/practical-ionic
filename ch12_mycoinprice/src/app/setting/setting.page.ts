import {Component, OnInit} from '@angular/core';
import {CryptoCurrencyService} from '../services/crypto-currency.service';

@Component({
	selector: 'app-setting',
	templateUrl: './setting.page.html',
	styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

	constructor(public cryptoCurrencyService: CryptoCurrencyService) {
	}

	ngOnInit() {
	}

}
