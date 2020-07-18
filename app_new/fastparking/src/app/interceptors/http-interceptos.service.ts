import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceProvider } from '../services/auth.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthServiceProvider) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let request: any = req;

    if (this.auth.userLogged && this.auth.tokenAuth) {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.tokenAuth}`
        }
      });
    }

    return next.handle(request);
  }

}