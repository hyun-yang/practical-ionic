import { Injectable } from '@angular/core';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private loadingController: LoadingController,
              private alertController: AlertController,
              private toastController: ToastController) {
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
      buttons: ['Ok']
    });
    await alert.present();
  }

  async showToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    return await toast.present();
  }
}
