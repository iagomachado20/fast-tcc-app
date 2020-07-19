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