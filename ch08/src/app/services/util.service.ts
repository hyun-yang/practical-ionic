import {Injectable} from '@angular/core';
import {AlertController, LoadingController, Platform, ToastController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
	providedIn: 'root'
})
export class UtilService {

	recordsPerPage = 15;

	constructor(private loadingController: LoadingController,
							private alertController: AlertController,
							private toastController: ToastController,
							private translateService: TranslateService,
							private platform: Platform) {
	}

	async showLoading(message: string) {
		const loading = await this.loadingController.create({
			message,
			spinner: 'circles'
		});
		return await loading.present();
	}

	async dismissLoading() {
		return await this.loadingController.dismiss();
	}

	async showAlert(header, message) {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: [this.translateService.instant('OK')]
		});
		await alert.present();
	}

	async showToast(message) {
		const toast = await this.toastController.create({
			message,
			duration: 1000
		});
		toast.present();
	}

	isCordova() {
		return this.platform.is('cordova');
	}

	isAndroid() {
		return this.platform.is('android');
	}

	isiOS() {
		return this.platform.is('ios');
	}
}
