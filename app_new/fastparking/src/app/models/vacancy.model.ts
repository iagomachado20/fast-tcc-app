import { User } from './user.model';

export enum VacancyStatus {
  Finished = 1,
  Busy = 2,
  Scheduled = 3,
  Canceled = 4
}

export interface ModelRequstVacancy {
  status: VacancyStatus;
  valor: number;
  establishment: string;
  checkIn: any;
  checkOut: any;
};

export interface CounterVacancy {
  vacanciesAvailables: number;
  vacanciesBusy: number;
}

export interface UserBusy {
  checkIn: string;
  checkOut: string;
  client: User;
  establishment: string;
  observacao: string;
  status: number;
  valor: 40;
  _id: string;
}