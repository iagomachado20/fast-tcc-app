import { Establishment } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

export interface VacancyScheduled {
  establishment: Establishment;
  valuePayment: number;
  dataCheckIn: Date | string;
  dataCheckout: Date | string;
};

@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  public dispatchVacancyConfirmed = new Subject<VacancyScheduled>();

  constructor(
    private http: HttpClient
  ) {}


}
