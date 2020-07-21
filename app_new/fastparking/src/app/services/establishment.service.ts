import { PayloadLogin } from 'src/app/models/errors.model';
import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  constructor(
    private http: HttpClient
  ) {}

  getItems(establishment ?: string) {

    const query = establishment ? `/establishments/${establishment}` : '/establishments';

    return this.http.get(`${environment.baseApi}${query}`);

  }

  

}
