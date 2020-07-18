import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import { LoginCredentials, AuthServiceProvider } from 'src/app/services/auth.service';
import { ErrorRequest, PayloadLogin } from 'src/app/models/errors.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  formLogin: FormGroup;

  constructor(
    public fb: FormBuilder,
    private util: UtilService,
    private auth: AuthServiceProvider
  ) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  requestLogin() {

    if (this.formLogin.invalid) { return false; }

    this.util.showLoading();

    const credentials: LoginCredentials = this.formLogin.value;

    this.auth.requestLogin(credentials)
    .subscribe((response: PayloadLogin) => {

      this.util.showToast(response.message);
      this.util.hideLoading();

      this.auth.saveSessionUser(response);

    }, (error: ErrorRequest) => {

      this.util.showToast(error.error.message);
      this.util.hideLoading();

    });


  }

}
