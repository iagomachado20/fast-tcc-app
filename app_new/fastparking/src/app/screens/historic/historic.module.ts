
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';

import { HistoricRoutingModule } from './historic-routing.module';

import { SharedComponentsModule } from 'src/app/components/shared.module';
import { HistoricPage } from './historic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HistoricRoutingModule,
    HttpClientModule,
    SharedComponentsModule
  ],
  exports: [],
  declarations: [
    HistoricPage
  ]
})
export class HistoricPageModule {}
