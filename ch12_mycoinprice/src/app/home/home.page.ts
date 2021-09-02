import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CryptoCurrencyService} from '../services/crypto-currency.service';
import {UtilService} from '../services/util.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

	DOLLAR_SIGN = '$';

	constructor(private router: Router,
							public cryptoCurrencyService: CryptoCurrencyService,
							private utilService: UtilService) {
	}

	ngOnInit(): void {
		this.updatePriceInfo();
	}

	addCoin(): void {
		this.router.navigateByUrl('/add-coin');
	}

	editCoin(coin): void {
		this.router.navigateByUrl('/edit-coin', coin);
	}

	async updatePriceInfo() {
		await this.utilService.showLoading('로딩 중..');
		this.cryptoCurrencyService.loadMyCoinPrice()
			.then(result => {
				this.utilService.dismissLoading();
			})
			.catch(error => {
				this.utilService.dismissLoading();
				this.utilService.showAlert('에러', '가격 정보를 가져오지 못했습니다.');
			});
	}

}
