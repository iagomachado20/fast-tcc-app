import { Socket } from 'ngx-socket-io';
import { dataSource } from './data.chart';
import { ErrorPayload } from './../../../models/errors.model';
import { Platform, ModalController, MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { AuthServiceProvider } from 'src/app/services/auth.service';
import { EstablishmentService } from 'src/app/services/establishment.service';


import { VacancyService } from 'src/app/services/vacancy.service';
import { ModalVacancies } from '../modal-vacancies/modal-vacancies.page';
import { Establishment, User } from 'src/app/models/user.model';
import { SuccessRequest, ErrorRequest } from 'src/app/models/errors.model';
import { forkJoin, Subscription } from 'rxjs';
import { CounterVacancy, UserBusy, VacancyStatus } from 'src/app/models/vacancy.model';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  sub: Subscription;
  user: User;
  isLoading = true;
  userRequesting: UserBusy = null;
  vacancies: CounterVacancy = {
    vacanciesAvailables: 0,
    vacanciesBusy: 0
  };

  listClientesBusy: UserBusy[] = [];

  dataSource: object;

  constructor(
    private util: UtilService,
    private auth: AuthServiceProvider,
    private establishmentService: EstablishmentService,
    private platform: Platform,
    private modal: ModalController,
    private vancancyService: VacancyService,
    private socketService: SocketService
  ) {
    this.socketService.listenCallRequest();
  }

  ngOnInit() {

    this.sub = forkJoin([
      this.auth.getMeProfile(),
      this.vancancyService.getCounterVacancys(),
      this.vancancyService.getListVacanciesBusy()
    ]).subscribe((response: any) => {

      this.user = response[0].data;
      this.vacancies = response[1];
      this.listClientesBusy = response[2].data;

      this.auth.setUserLogged.next(this.user);

      this.isLoading = false;

    });

    this.dataSource = dataSource;

    this.sub = this.socketService.senderDataSocket
    .subscribe((dataSocket: { data: UserBusy }) => {
      
      this.userRequesting = dataSocket.data;

    }); 

  }

  doRefresh(event) {

    this.isLoading = true;

    this.ngOnInit();

    setTimeout(() => {
      event.target.complete();
    });

  }

  async openDialog() {

    if (this.vacancies.vacanciesBusy === 0) {
      return false;
    }

    const modal = await this.modal.create({
      component: ModalVacancies,
      cssClass: 'modal-background',
      swipeToClose: true,
      backdropDismiss: true,
      animated: true,
      showBackdrop: true,
      componentProps: {
        list: this.listClientesBusy
      }
    });

    await modal.present();

    modal.onDidDismiss().then(response => {

      this.ngOnInit();

    });

  }

  changeStatus(status: boolean) {

    this.vancancyService.updateActivityEstablishment(status)
    .subscribe((response: SuccessRequest) => {
      
      this.util.showToast(response.message);

    }, (error: ErrorRequest) => {

      this.util.showToast(error.error.message);

    });

  }


  confirm(vacancy: UserBusy) {

    const payloadAction = {
      vacancyId: vacancy._id,
      status: VacancyStatus.Busy
    };

    this.vancancyService.updateStatusVacancy(payloadAction.status, payloadAction.vacancyId)
      .subscribe((response: SuccessRequest) => {

        this.util.showToast(`A vaga de ${vacancy.client.nome} foi confirmada!`);
        this.ngOnInit();
        this.userRequesting = null;


      }, error => {

        this.util.showToast('Não foi possível atualizar o status desta vaga. Tente novamente!');

      });
  }

  cancel(userVacancy: UserBusy) {
    
    this.vancancyService.cancelVacancyClient(userVacancy, 'houve imprevisto')
    .subscribe((response: SuccessRequest) => {

      this.util.showToast(response.message);
      this.ngOnInit();

    },  (error: ErrorRequest) => {

      this.util.showToast(error.error.message);

    });

  }

  ionViewDidLeave() {
    this.sub.unsubscribe();
  }

}

