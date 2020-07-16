import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface LoginCredentials {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthServiceProvider {

  constructor(
    private http: HttpClient
  ) {}

  requestLogin(credentials: LoginCredentials) {

    return this.http.post(`${environment.baseApi}login`, credentials);

  }

}
