import { PayloadLogin } from 'src/app/models/errors.model';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';

export interface LoginCredentials {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthServiceProvider {

  public userLogged: User;
  public setUserLogged = new Subject<User>();
  get tokenAuth () {

    return localStorage.getItem('token');

  }

  set tokenAuth(token: string) {
    localStorage.setItem('token', token);
  }

  constructor(
    private http: HttpClient
  ) {}

  requestLogin(credentials: LoginCredentials) {

    return this.http.post(`${environment.baseApi}/login`, credentials);

  }

  registerUser(dataUser: object) {

    return this.http.post(`${environment.baseApi}/register`, dataUser);

  }

  getMeProfile() {

    return this.http.get(`${environment.baseApi}/me`);

  }

  saveSessionUser(data: PayloadLogin) {

    this.tokenAuth = data.token;
    this.userLogged = data.user;

  }

  clearSession() {

    this.tokenAuth = null;
    this.userLogged = null;
    localStorage.clear();

  }

}
