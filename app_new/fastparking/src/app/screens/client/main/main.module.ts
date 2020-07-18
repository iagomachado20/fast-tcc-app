import { Geolocation } from '@ionic-native/geolocation/ngx';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';

import { MainRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { SharedComponentsModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MainRoutingModule,
    HttpClientModule,
    SharedComponentsModule
  ],
  exports: [],
  declarations: [
    MainPage
  ],
  providers: [
    Geolocation
  ]
})
export class MainPageModule {}
