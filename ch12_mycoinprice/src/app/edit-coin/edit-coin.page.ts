import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CryptoCurrencyService} from '../services/crypto-currency.service';
import {UtilService} from '../services/util.service';
import {AlertController} from '@ionic/angular';
import {Coin} from '../model/Coin';
import {CoinName} from '../model/CoinName';
import {CategoryScale, Chart, Filler, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip} from 'chart.js';

@Component({
	selector: 'app-edit-coin',
	templateUrl: './edit-coin.page.html',
	styleUrls: ['./edit-coin.page.scss'],
})
export class EditCoinPage implements OnInit {

	@ViewChild('coinChart') coinChart: any;
	coin: Coin;
	topTenCoinList: CoinName[] = [];

	constructor(private router: Router,
							private cryptoCurrencyService: CryptoCurrencyService,
							private alertController: AlertController,
							private utilService: UtilService) {
		this.coin = this.router.getCurrentNavigation().extras as Coin;
		this.topTenCoinList = this.cryptoCurrencyService.getTopTenCoinList();
		Chart.register(
			LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, Filler
		);
	}

	ngOnInit() {
		this.getCoinDetail();
	}

	async getCoinDetail() {
		const labels = [];
		const data = [];
		await this.utilService.showLoading('로딩 중..');
		this.cryptoCurrencyService.getHistoryData(this.coin)
			.subscribe(result => {
				const chartData = result.data;
				for (let i = 0; i < chartData.length; i++) {
					if (i % 10 === 0) {
						const date = new Date(chartData[i].date);
						labels.push(date.getHours());
						data.push(chartData[i].priceUsd);
					}
				}
				this.showChart(this.coin.name, labels, data);
				this.utilService.dismissLoading();
			}, error => {
				this.utilService.dismissLoading();
				this.utilService.showAlert('에러', '가격 정보를 가져오지 못했습니다.');
			});
	}

	showChart(name, labels, dataset) {
		const context = this.coinChart.nativeElement.getContext('2d');
		this.coinChart = new Chart(context, {
			type: 'line',
			data: {
				labels: labels,
				datasets: [
					{
						label: name,
						data: dataset,
						backgroundColor: 'rgb(0, 255, 0, 1)',
						borderColor: 'rgba(0,0,255,0.5)',
						fill: true,
						borderWidth: 1
					}
				],
			},
			options: {
				plugins: {
					legend: {
						display: true,
						position: 'top'
					},
				},
				elements: {
					point: {
						radius: 1.5,
						pointStyle: 'circle'
					}
				},
				scales: {
					y: {
						beginAtZero: true,
						title: {
							display: true,
							text: '가격(USD)'
						},
					},
					x: {
						title: {
							display: true,
							text: '시간별'
						},
					}
				}
			}
		});
	}

	updateCoin() {
		this.cryptoCurrencyService.updateCoin(this.coin);
		this.router.navigateByUrl('/home');
	}

	async removeCoin(coin): Promise<void> {
		const alert = await this.alertController.create({
			header: '삭제 확인',
			message: '삭제 하시겠습니까?',
			buttons: [
				{
					text: '삭제',
					handler: () => {
						this.cryptoCurrencyService.removeCoin(coin);
						this.router.navigateByUrl('/home');
					}
				},
				{
					text: '취소',
					handler: () => {
					}
				}
			]
		});
		await alert.present();
	}
}
