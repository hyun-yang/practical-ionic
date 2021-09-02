import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CryptoCurrencyService} from '../services/crypto-currency.service';
import {Coin} from '../model/Coin';
import {CoinName} from '../model/CoinName';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilService} from '../services/util.service';


@Component({
	selector: 'app-add-coin',
	templateUrl: './add-coin.page.html',
	styleUrls: ['./add-coin.page.scss'],
})
export class AddCoinPage implements OnInit {

	coin: Coin;
	topTenCoinList: CoinName[] = [];
	coinForm: FormGroup;

	constructor(private router: Router,
							private formBuilder: FormBuilder,
							private utilService: UtilService,
							private cryptoCurrencyService: CryptoCurrencyService) {
		this.coin = new Coin();
		this.topTenCoinList = this.cryptoCurrencyService.getTopTenCoinList();
		this.coinForm = this.formBuilder.group({
			name: ['', Validators.required],
			amount: ['', Validators.required],
			comment: ['', Validators.required]
		});
	}

	ngOnInit() {
	}

	addCoin(): void {
		if (this.coinForm.controls.name.valid &&
			this.coinForm.controls.amount.valid &&
			this.coinForm.controls.comment.valid) {
			this.coin = this.coinForm.value;
			this.cryptoCurrencyService.addCoin(this.coin);
			this.router.navigateByUrl('/home');
		} else {
			this.utilService.showAlert('에러', '모든 값을 입력하세요');
		}
	}
}
