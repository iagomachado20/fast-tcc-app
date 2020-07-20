import { VacancyStatus } from './../../../models/vacancy.model';
import { Component, OnInit, Input } from '@angular/core';
import { Establishment } from 'src/app/models/user.model';
import { UtilService } from 'src/app/services/util.service';
import { ModalController } from '@ionic/angular';
import { VacancyService } from 'src/app/services/vacancy.service';
import { UserBusy } from 'src/app/models/vacancy.model';

@Component({
  selector: 'app-modal-vacancies',
  templateUrl: './modal-vacancies.page.html',
  styleUrls: ['./modal-vancacies.page.scss'],
})
export class ModalVacancies implements OnInit {

  @Input() list: UserBusy[] = [];

  constructor(
    private modal: ModalController,
    private util: UtilService,
    private vacancyService: VacancyService
  ) {}

  ngOnInit() {}

  close() {
    this.modal.dismiss();
  }

  getStats(type: VacancyStatus) {

    let status = {
      name: '',
      color: ''
    };
    

    switch (type) {
      case VacancyStatus.Busy:
        status = {
          name: 'Ocupado',
          color: 'warning'
        };
        break;
      case VacancyStatus.Canceled:
        status = {
          name: 'Cancelado',
          color: 'danger'
        };
      case VacancyStatus.Scheduled:
        status = {
          name: 'Agendado',
          color: 'primary'
        };    
      default:
        status = status;
        break;
    }

    return status;

  }

}
