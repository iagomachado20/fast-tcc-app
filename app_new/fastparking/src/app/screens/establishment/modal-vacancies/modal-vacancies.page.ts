import { ErrorRequest } from './../../../models/errors.model';
import { VacancyStatus } from './../../../models/vacancy.model';
import { Component, OnInit, Input } from '@angular/core';
import { Establishment } from 'src/app/models/user.model';
import { UtilService } from 'src/app/services/util.service';
import { ModalController } from '@ionic/angular';
import { VacancyService } from 'src/app/services/vacancy.service';
import { UserBusy } from 'src/app/models/vacancy.model';
import { SuccessRequest } from 'src/app/models/errors.model';

@Component({
  selector: 'app-modal-vacancies',
  templateUrl: './modal-vacancies.page.html',
  styleUrls: ['./modal-vancacies.page.scss'],
})
export class ModalVacancies implements OnInit {

  statusVacancy = VacancyStatus;
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
          name: 'Utilizando',
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

  acceptAction(vacancy: UserBusy, sliding) {

    const payloadAction = {
      vacancyId: vacancy._id,
      status: VacancyStatus.Busy
    };

    if (vacancy.status === VacancyStatus.Busy) {
      payloadAction.status = VacancyStatus.Finished;
    } else {
      vacancy.status = VacancyStatus.Busy;
    }

    this.vacancyService.updateStatusVacancy(payloadAction.status, payloadAction.vacancyId)
      .subscribe((response: SuccessRequest) => {

        this.util.showToast(response.message);

        if (payloadAction.status === VacancyStatus.Finished) {
          
          this.list = this.list.filter(user => {
            return user._id !== vacancy._id;
          });

          if (!this.list.length) {
            this.close();
          }

          sliding.close();

        }


      }, error => {

        this.util.showToast('Não foi possível atualizar o status desta vaga. Tente novamente!');

      });

  }

  cancel(userVacancy: UserBusy, sliding) {
    
    this.vacancyService.cancelVacancyClient(userVacancy, 'houve imprevisto')
    .subscribe((response: SuccessRequest) => {

      this.util.showToast(response.message);
      this.close();

    },  (error: ErrorRequest) => {

      this.util.showToast(error.error.message);
      sliding.close();

    });

  }

}
