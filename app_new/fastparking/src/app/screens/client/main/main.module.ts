import { ModalCallPage } from './../modal-call/modal-call.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';

import { MainRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { SharedComponentsModule } from 'src/app/components/shared.module';
import { StarRatingComponent } from 'src/app/components/star-rating/star-rating.component';
import { FilterList } from 'src/app/pipes/filter.list.pipe';

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
    MainPage,
    ModalCallPage,
    // StarRatingComponent
  ],
  entryComponents: [
    // StarRatingComponent
  ],
  providers: [
    Geolocation,
    FilterList
  ]
})
export class MainPageModule {}
