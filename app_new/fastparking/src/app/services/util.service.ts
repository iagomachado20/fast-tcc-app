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
  static diff_hours(date2, date1) {
    
    let diff =(date2.getTime() - date1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
  }

  async showLoading(message = 'Carregando...') {

    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: message,
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
