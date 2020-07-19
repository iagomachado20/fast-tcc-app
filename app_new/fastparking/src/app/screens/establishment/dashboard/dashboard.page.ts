import { Platform, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { AuthServiceProvider } from 'src/app/services/auth.service';
import { EstablishmentService } from 'src/app/services/establishment.service';


import { VacancyService } from 'src/app/services/vacancy.service';
import { ModalVacancies } from '../modal-vacancies/modal-vacancies.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private util: UtilService,
    private auth: AuthServiceProvider,
    private establishmentService: EstablishmentService,
    private platform: Platform,
    private modal: ModalController,
    private vancancyService: VacancyService
  ) {}

  ngOnInit() {
    
  }

  doRefresh() {

  }

  async openDialog() {

    const modal = await this.modal.create({
      component: ModalVacancies,
      cssClass: 'modal-background',
      swipeToClose: true,
      backdropDismiss: true,
      animated: true,
      showBackdrop: true
    });

    await modal.present();

  }

}

