import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { SharedComponentsModule } from 'src/app/components/shared.module';
import { ModalVacancies } from '../modal-vacancies/modal-vacancies.page';

import { FusionChartsModule } from 'angular-fusioncharts';

import * as FusionCharts from 'fusioncharts';
import * as charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { StarRatingComponent } from 'src/app/components/star-rating/star-rating.component';

FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DashboardRoutingModule,
    HttpClientModule,
    SharedComponentsModule,
    FusionChartsModule
  ],
  exports: [],
  declarations: [
    DashboardPage,
    ModalVacancies
  ],
  providers: [
  ]
})
export class DashboardModule {}
