import { Observable } from 'rxjs';
import { TypeUser, User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { AuthServiceProvider } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { VacancyService } from 'src/app/services/vacancy.service';
import { UserBusy, VacancyStatus } from 'src/app/models/vacancy.model';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.page.html',
  styleUrls: ['./historic.page.scss']
})
export class HistoricPage implements OnInit {

  dataHistory: UserBusy[] = [];
  typeUser = TypeUser;
  statusVacancy = VacancyStatus;
  user: User;

  constructor(
    private util: UtilService,
    public auth: AuthServiceProvider,
    private router: Router,
    private vacancyService: VacancyService
  ) {}

  requestHistory() {

    

    const { perfil } = this.auth.userLogged;

    this.vacancyService.getHistory(TypeUser[perfil])
    .subscribe((data: {historico: UserBusy[]}) => {

      this.dataHistory = data.historico;
      console.log(this.dataHistory);
      this.util.hideLoading();

    }, error => {
      console.log(error);
      this.util.hideLoading();
    });


  }

  ngOnInit() {

    this.util.showLoading();

    this.auth.setUserLogged.subscribe(user => {
      this.user = user;
      this.requestHistory();
    });

  }

}
