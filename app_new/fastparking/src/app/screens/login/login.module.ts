
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';

import { LoginRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { SharedComponentsModule } from 'src/app/components/shared.module';
import { RegisterPage } from '../register/register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginRoutingModule,
    HttpClientModule,
    SharedComponentsModule
  ],
  exports: [],
  declarations: [
    LoginPage,
    RegisterPage
  ]
})
export class LoginPageModule {}
