import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceProvider } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  sub: Subscription;

  constructor(
    private auth: AuthServiceProvider,
    private router: Router
  ) {}

  canActivate(): boolean {

    if (!this.auth.tokenAuth) {
      this.router.navigate(['/']);
      return false;
    }
    return true;

  }
}