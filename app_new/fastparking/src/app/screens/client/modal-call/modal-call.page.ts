import { Component, OnInit, Input } from '@angular/core';
import { Establishment } from 'src/app/models/user.model';
import { UtilService } from 'src/app/services/util.service';
import { ModalController } from '@ionic/angular';
import { VacancyService } from 'src/app/services/vacancy.service';
import { ModelRequstVacancy, VacancyStatus } from 'src/app/models/vacancy.model';

@Component({
  selector: 'app-modal-call',
  templateUrl: './modal-call.page.html',
  styleUrls: ['./modal-call.page.scss'],
})
export class ModalCallPage implements OnInit {
  @Input() data: Establishment;
  dateNow = new Date().toISOString();
  dateCheckout = this.dateNow;
  dateCheckIn = this.dateNow;
  valuePayment = 0;

  constructor(
    private modal: ModalController,
    private util: UtilService,
    private vacancyService: VacancyService
  ) {}

  ngOnInit() {}

  close() {
    this.modal.dismiss();
  }

  calculatePrice() {

    const checkout = new Date(this.dateCheckout);
    const checkin = new Date(this.dateCheckIn);

    const hoursPrice = UtilService.diff_hours(checkout, checkin);

    const { valorhora } = this.data;

    this.valuePayment = hoursPrice * valorhora;

  }

  requestVacancy() {

    this.util.showToast('Solicitando Vaga...');

    this.util.showLoading('Solicitando...');

    const dataRequestVacancy: ModelRequstVacancy = {
      status: VacancyStatus.Scheduled,
      valor: this.valuePayment,
      establishment: this.data._id,
      checkIn: this.dateCheckIn,
      checkOut: this.dateCheckout
    }; 

    this.vacancyService.requestVacancy(dataRequestVacancy)
    .subscribe(response => {

      console.log(response);

      this.close();
      this.util.hideLoading();

      this.vacancyService.dispatchVacancyConfirmed.next({
        establishment: this.data,
        valuePayment: this.valuePayment,
        dataCheckIn: this.dateCheckIn,
        dataCheckout: this.dateCheckout
      });

    }, error => {

      this.close();
      this.util.hideLoading();
      this.util.showToast('Não foi possível solicitar sua vaga neste momento!');

    });

  }

}
