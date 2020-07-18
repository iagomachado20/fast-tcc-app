import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  static deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  async showLoading() {

    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Carregando...',
      translucent: true,
      backdropDismiss: false
    });

    await loading.present();
  }

  hideLoading() {
    this.loadingController.dismiss();
  }

  async showToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 3500
    });
    toast.present();
  }

}
