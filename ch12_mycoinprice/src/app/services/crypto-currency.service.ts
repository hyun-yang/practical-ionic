import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {Storage} from '@ionic/storage';
import {UtilService} from './util.service';
import {COIN_TOP_TEN_LIST} from '../model/CoinTopTenList';
import {Coin} from '../model/Coin';
import {CoinName} from '../model/CoinName';

@Injectable({
	providedIn: 'root'
})
export class CryptoCurrencyService {

	coins: Coin[] = [];
	interval = 'h1';
	COINCAP_ASSETS_API_URL = 'https://api.coincap.io/v2/assets/';

	constructor(private httpClient: HttpClient,
							private storage: Storage,
							private utilService: UtilService) {
		this.initializeStorage();
	}

	async initializeStorage() {
		await this.storage.create();
	}

	addCoin(coin: Coin): void {
		this.coins.push(coin);
		this.getCurrentCoinPrices();
	}

	removeCoin(coin): void {
		this.coins.forEach((item, index) => {
			if (item === coin) {
				this.coins.splice(index, 1);
			}
		});
		this.getCurrentCoinPrices();
	}

	updateCoin(coin: Coin): void {
		const index = this.coins.indexOf(coin);
		this.coins[index] = coin;
		this.getCurrentCoinPrices();
	}

	saveCoin(): void {
		this.storage.set('MyCoinPrice', this.coins)
			.then((result) => {
			})
			.catch((error) => {
				this.utilService.showAlert('에러', '저장에 실패했습니다.');
			});
	}

	async loadMyCoinPrice() {
		this.storage.get('MyCoinPrice')
			.then(result => {
				if (result !== null) {
					this.coins = result;
					if (this.coins.length) {
						this.getCurrentCoinPrices();
					}
				}
			});
	}

	getTopTenCoinList(): CoinName[] {
		return COIN_TOP_TEN_LIST;
	}

	getTotalValue(): number {
		return this.coins
			.filter(c => c.amount > 0)
			.map(coin => coin.amount * coin.value)
			.reduce((sum, current) => sum + current, 0);
	}

	getCurrentCoinPrices(): Subscription {
		if (!this.coins.length) {
			return;
		}

		return this.getCoinPrice(this.coins)
			.subscribe(result => {
				result.forEach((coin, index) => {
					this.coins[index].value = coin.data.priceUsd;
					this.coins[index].upOrDown = coin.data.changePercent24Hr;
				});
				this.saveCoin();
			}, (error => {
				this.utilService.showAlert('에러', '가격 정보를 가져오지 못했습니다.');
			}));
	}

	getCoinPrice(list: Coin[]): Observable<any> {
		const requests = [];
		for (const coin of list) {
			const request = this.httpClient.get(this.COINCAP_ASSETS_API_URL + coin.name);
			requests.push(request);
		}
		return forkJoin(requests);
	}

	getHistoryData(coin) {
		return this.httpClient.get(this.COINCAP_ASSETS_API_URL + coin.name + '/history?interval=' + this.interval);
	}
}
