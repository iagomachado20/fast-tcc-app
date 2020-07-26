import { Subscription } from 'rxjs';
import { VacancyScheduled } from './../../../services/vacancy.service';
import { Platform } from '@ionic/angular';
import { Establishment, User } from './../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { AuthServiceProvider } from 'src/app/services/auth.service';
import { EstablishmentService } from 'src/app/services/establishment.service';
import { ModalCallPage } from '../modal-call/modal-call.page';
import { VacancyService } from 'src/app/services/vacancy.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  sub: Subscription;
  isLoading = true;
  establishments: Establishment[] = [];
  vacancyScheduled: VacancyScheduled;

  constructor(
    private util: UtilService,
    private auth: AuthServiceProvider,
    private establishmentService: EstablishmentService,
    private platform: Platform,
    private vancancyService: VacancyService,
    private mapService: MapService
  ) {


  }

  ionViewDidLeave() {
    this.sub.unsubscribe();
  }

  changeStateLoading() {

    setTimeout(() => this.isLoading = !this.isLoading, 2000);

  }

  getProfileUser() {

    this.sub = this.auth.getMeProfile()
    .subscribe((dataUser: { success: boolean, data: User }) => {

      this.auth.userLogged = dataUser.data;
      this.auth.setUserLogged.next(dataUser.data);

      this.mapService.getPositionUser().then(position => {

        const { latitude, longitude } = position.coords;

        this.mapService.createMarker(dataUser.data, {
          lat: latitude,
          lng: longitude,
        }, true);

      });

    });

  }

  getAllEstablishments() {
    this.establishmentService.getItems()
    .subscribe((establishments: { success: boolean, data: Establishment[] }) => {

      this.establishments = establishments.data;

      this.establishments = this.mapService.populateMarkersDistance(this.establishments);
      this.changeStateLoading();

    }, error => {

      this.util.showToast('Não foi possível carregar seus dados');
      this.changeStateLoading();

    });
  }

  getValidateVancacyIsBusy() {

    this.vancancyService.getVacancyBusyUser()
    .subscribe((response: any) => {

      const { vacancy } = response.data;

      const dataVacancy: VacancyScheduled = {
        establishment: response.data.establishment,
        valuePayment: vacancy.valor,
        dataCheckIn: vacancy.checkIn,
        dataCheckout: vacancy.checkOut
      };

      this.isLoading = false;

      this.vacancyScheduled = dataVacancy;

      const position = {
        lat: Number(dataVacancy.establishment.localizacao[0]),
        lng: Number(dataVacancy.establishment.localizacao[1])
      };

      this.vacancyScheduled.establishment.distance = this.mapService.calculateDistancePointUser(
        this.mapService.positionUser, position
      );

      this.vancancyService.dispatchVacancyConfirmed.next(dataVacancy);

      this.changeStateLoading();

    });

  }

  async ngOnInit() {

    await this.platform.ready();

    await this.mapService.createInstanceMap();
    
    await this.getProfileUser();

    await this.getAllEstablishments();

    await this.getValidateVancacyIsBusy();

    this.sub = this.vancancyService.dispatchVacancyConfirmed
    .subscribe((dataVacancy: VacancyScheduled) => {

      this.mapService.markerDistancePointsSelected(dataVacancy.establishment, this.mapService.positionUser);
      this.vacancyScheduled = dataVacancy;

    });

  }

}
